package com.gymmate.cmdlinerunner;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.gymmate.daos.AdminDao;
import com.gymmate.entities.Admin;
import com.gymmate.entities.BaseEntity.UserRole;
import com.gymmate.entities.Gender;

@Component
public class AdminDataInitializer {

	@Bean
	 CommandLineRunner initAdmin(AdminDao admindao,
			PasswordEncoder passwordEncoder) {
		return args -> {
			String defaultEmail = "admin@gymmate.com";
			String defaultPassword = "admin123"; 

			boolean adminExists = admindao.existsByEmail(defaultEmail);
			if (!adminExists) {
				Admin admin = new Admin();
				admin.setEmail(defaultEmail);
				admin.setPassword(passwordEncoder.encode(defaultPassword));
				admin.setAddress("Pune");
				admin.setFirstName("Admin");
				admin.setLastName("Admin");
				admin.setGender(Gender.MALE);
				admin.setMobile("987456123");
				admin.setRole(UserRole.ROLE_ADMIN);
				admindao.save(admin);
				System.out.println(
						"Default admin created with email: " + defaultEmail + " and password: " + defaultPassword);
			}
		};
	}
}
