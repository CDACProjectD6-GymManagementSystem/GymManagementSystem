package com.gymmate.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentResponseDto extends BaseDTO{
	private String firstName;
	private String lastName;
	private String subscriptionName;
	private double amount;
}
