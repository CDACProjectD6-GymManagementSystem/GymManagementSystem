package com.gymmate.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "equipments")
public class Equipment extends SuperBaseEntity {

	private String name;
	private String description;
	@Enumerated(EnumType.STRING)
	private Category category;
	@Column(name = "for_maintenance")
	private boolean forMaintenance;
	private double price;

	public enum Category {
		CARDIO, STRENGTH, FLEXIBILITY, FREE_WEIGHTS, RESISTANCE_MACHINES
	}

}
