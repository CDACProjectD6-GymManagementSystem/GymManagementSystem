package com.gymmate.dtos;

import com.gymmate.entities.Equipment.Category;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EquipmentRequestDto {
	private String name;
	private String description;
	private Category category;
	private double price;
}
