package com.sunbeam.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
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
	@Column(name = "payment_id")
	private String paymentId;
	@ManyToOne // unidirectional
	@JoinColumn(nullable = false)
	private UserEntity user;
	@Column(name = "razorpay_order_id")
	private String RazorPayOrderId;
	private double amount;
	@Enumerated(EnumType.STRING)
	private Status status;

	public enum Status {
		SUCCESS, PENDING, FAILED

	}

	public Payment(String paymentId, String razorPayOrderId, double amount, Status status) {
		super();
		this.paymentId = paymentId;
		RazorPayOrderId = razorPayOrderId;
		this.amount = amount;
		this.status = status;
	}
}
