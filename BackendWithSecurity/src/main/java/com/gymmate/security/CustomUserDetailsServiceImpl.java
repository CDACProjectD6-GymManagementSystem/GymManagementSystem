package com.gymmate.security;

import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gymmate.daos.AdminDao;
import com.gymmate.daos.ReceptionistDao;
import com.gymmate.daos.TrainerDao;
import com.gymmate.daos.UserDao;
import com.gymmate.entities.Admin;
import com.gymmate.entities.Receptionist;
import com.gymmate.entities.Trainer;
import com.gymmate.entities.UserEntity;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class CustomUserDetailsServiceImpl implements UserDetailsService {
	// depcy
	private final UserDao userDao;
	private final AdminDao adminDao;
	private final TrainerDao trainerDao;
	private final ReceptionistDao receptionistDao;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Optional<UserEntity> userOpt = userDao.findByEmailAddress(email);

		if (userOpt.isPresent()) {
			return userOpt.get();
		}

		Optional<Trainer> trainerOpt = trainerDao.findByEmailAddress(email);

		if (trainerOpt.isPresent()) {
			return trainerOpt.get();
		}

		Optional<Receptionist> receptionistOpt = receptionistDao.findByEmailAddress(email);

		if (receptionistOpt.isPresent()) {
			return receptionistOpt.get();
		}
		Optional<Admin> adminOpt = adminDao.findByEmailAddress(email);

		if (adminOpt.isPresent()) {
			return adminOpt.get();
		}
		throw new UsernameNotFoundException("userName not found .....");
	}
}
