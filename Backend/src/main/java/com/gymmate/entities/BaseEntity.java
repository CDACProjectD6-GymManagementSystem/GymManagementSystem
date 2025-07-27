package com.gymmate.entities;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@MappedSuperclass
public class BaseEntity extends SuperBaseEntity {
	 
 	@Column(name = "first_name",length = 25)
	private String firstName;
	@Column(name = "last_name",length = 25)
	private String lastName;
	@Column(name = "email",length = 100,unique = true,nullable = false)
	private String email;
	@Column(name = "password",length = 1000,nullable = false)
	private String password;
	@Column(name = "address",length = 250)
	private String address;
	@Column(name = "mobile")
	private String mobile;
	@Enumerated(EnumType.STRING)
	private Gender gender;
		
}
