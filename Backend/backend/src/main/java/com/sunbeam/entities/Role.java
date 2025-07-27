package com.sunbeam.entities;

import jakarta.annotation.Generated;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "roles")
public class Role {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long roleId;
	@Column(name = "email", length = 100, unique = true, nullable = false)
	private String email;
	@Column(name = "password", length = 1000, nullable = false)
	private String password;
	@Enumerated(EnumType.STRING)
	private UserRole role;

	private enum UserRole {
		ROLE_USER, ROLE_ADMIN, ROLE_TRAINER, ROLE_RECEPTIONIST
	}
}
