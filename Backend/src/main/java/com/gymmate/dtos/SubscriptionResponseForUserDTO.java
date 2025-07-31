package com.gymmate.dtos;

import com.gymmate.entities.Subscription.GymAccess;

import lombok.Getter;
import lombok.Setter;

@Getter@Setter

public class SubscriptionResponseForUserDTO {
	private Long id;
	private String name;
	private String description;
	private GymAccess access;
	private boolean dietConsultation;
	private boolean isSauna;
	private int duration;
	private double price;
	private double discount;
}
