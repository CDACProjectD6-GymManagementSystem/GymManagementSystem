package com.gymmate.dtos;

import com.gymmate.entities.Gender;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TrainerRequestDto {
	private double salary;
	private String certifications;
	private String expertise;
	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private String address;
	private String mobile;
	private Gender gender;
}
