package com.gymmate.dtos;

import com.gymmate.entities.Gender;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDisplayProfileDto {
	private String firstName;
	private String lastName;
	private String email;
	private String address;
	private String mobile;
	private Gender gender;
	private int age;
	private String goals;
	private double height;
	private double wieght;
	private String conditionsOrAllergies;
	private String imageUrl;         
	private String imagePublicId;  
}
