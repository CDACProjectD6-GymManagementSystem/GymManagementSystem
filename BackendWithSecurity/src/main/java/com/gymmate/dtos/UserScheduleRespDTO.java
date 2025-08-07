package com.gymmate.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserScheduleRespDTO {
	private String sunday = "Rest";
	private String monday = "Biceps";
	private String tuesday = "Back";
	private String wednesday = "Cardio";
	private String thursday = "Chest";
	private String friday = "Triceps + Shoulder";
	private String saturday = "Legs";
	private String instructions = "None";

}
