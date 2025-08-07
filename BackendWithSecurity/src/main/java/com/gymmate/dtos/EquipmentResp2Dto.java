package com.gymmate.dtos;

import com.gymmate.entities.Equipment.Category;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EquipmentResp2Dto {
	private Long id;
	private String name;
	private String description;
	private Category category;
	private double price;
}
