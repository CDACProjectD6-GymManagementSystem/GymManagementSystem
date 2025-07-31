package com.gymmate.dtos;

import com.gymmate.entities.Gender;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReceptionistRespDto extends BaseDTO {
	private String firstName;
	private String lastName;
	private String email;
	private String address;
	private String mobile;
	private Gender gender;
	private double salary;
}
