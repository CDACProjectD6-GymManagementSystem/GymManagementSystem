package com.gymmate.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter

@NoArgsConstructor
@Table(name = "payments")
@JsonIgnoreProperties({ "updatedTime" }) // used for excluding field from JSON
public class Payment extends SuperBaseEntity {
	private String firstName;
	private String lastName;
	private String subscriptionName;
	private double amount;

	 
}
