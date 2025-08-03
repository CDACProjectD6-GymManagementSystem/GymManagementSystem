package com.gymmate.dtos;

import com.gymmate.entities.Gender;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReceptionistRequestDto {
	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private String address;
	private String mobile;
	private Gender gender;
	private double salary;
}
