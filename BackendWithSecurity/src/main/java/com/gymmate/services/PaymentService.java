package com.gymmate.services;

import java.util.List;

import com.gymmate.dtos.PaymentResponseDto;

public interface PaymentService {

	List<PaymentResponseDto> getAllPayments();

}
