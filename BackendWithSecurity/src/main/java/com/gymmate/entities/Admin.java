package com.gymmate.entities;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "admin")
@Getter
@Setter
@AllArgsConstructor
public class Admin extends BaseEntity implements UserDetails {
	public String getUsername() {
		// TODO Auto-generated method stub
		return this.getEmail();
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		
		return List.of(new SimpleGrantedAuthority(this.getRole().name()));
	}

	public Admin(String firstName, String lastName, String email, String password, String address, String mobile,
			Gender gender, UserRole role, boolean isSubscribed) {
		super(firstName, lastName, email, password, address, mobile, gender, role, isSubscribed);
	}
	
	
}
