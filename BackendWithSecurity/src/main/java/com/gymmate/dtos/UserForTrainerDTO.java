package com.gymmate.dtos;

import com.gymmate.entities.Gender;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@NoArgsConstructor
@Getter
@Setter
@ToString
public class UserForTrainerDTO {
	private Long id;
	private String firstName;
	private String lastName; 
	private int age;
	private Gender gender;
	private String goals;
	private String conditionsOrAllergies;
	private double height;
	private double weight;
}


