package com.gymmate.dtos;

import com.gymmate.entities.Diet;
import com.gymmate.entities.Gender;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDietDTO {
	private String firstName;
	private String lastName;
	private Gender gender;
	private Diet diet;
}


