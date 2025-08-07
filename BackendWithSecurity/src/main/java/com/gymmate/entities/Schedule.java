package com.gymmate.entities;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Schedule extends SuperBaseEntity {
	private String sunday = "Rest";
	private String monday = "Biceps";
	private String tuesday = "Back";
	private String wednesday = "Cardio";
	private String thursday = "Chest";
	private String friday = "Triceps + Shoulder";
	private String saturday = "Legs";
	private String instructions;
	

}
