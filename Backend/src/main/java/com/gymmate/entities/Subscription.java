package com.gymmate.entities;

import java.util.ArrayList;
import java.util.List;

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
 @NoArgsConstructor
@Table(name = "subscriptions")
public class Subscription extends SuperBaseEntity {
	private String name;
	@Column(length = 300)
	private String description;
	@Enumerated(EnumType.STRING)
	private GymAccess access;
	@Column(name = "diet_consultation")
	private boolean dietConsultation;
	@Column(name = "group_classes")
	private List<String> groupClasses = new ArrayList<>();
	@Column(name = "is_sauna")
	private boolean isSauna;
	private int duration;
	private double price;
	private double discount;
	@Column(name = "is_active")
	private boolean isActive;
	public enum GymAccess {
		OFF_PEAK_HOURS, FULLTIME
	}
	public Subscription(String name, String description, GymAccess access, boolean dietConsultation, boolean isSauna,
			int duration, double price, double discount, boolean isActive) {
		super();
		this.name = name;
		this.description = description;
		this.access = access;
		this.dietConsultation = dietConsultation;
		this.isSauna = isSauna;
		this.duration = duration;
		this.price = price;
		this.discount = discount;
		this.isActive = isActive;
	}
	
}
