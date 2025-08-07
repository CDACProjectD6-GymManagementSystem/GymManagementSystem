package com.gymmate.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Diet extends SuperBaseEntity {
	private String breakfast="100 ml skimmed milk + Soaked Dry Fruits ";
	private String lunch="200 Grams Vegies +199 gram Chicken + 100 Gram Rice";
	private String dinner="Roti +sabji +salad";
	@Column(name = "midsnack")
	private String midSnack="Handful of chana";
	private String instructions;

}





