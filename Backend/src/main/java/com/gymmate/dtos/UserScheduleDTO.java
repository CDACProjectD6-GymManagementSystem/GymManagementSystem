package com.gymmate.dtos;

import com.gymmate.entities.Gender;
import com.gymmate.entities.Schedule;

import lombok.Getter;
import lombok.Setter;



@Getter
@Setter
public class UserScheduleDTO {
	private String firstName;
	private String lastName;
	private Gender gender;
	private Schedule schedule;
	
}
