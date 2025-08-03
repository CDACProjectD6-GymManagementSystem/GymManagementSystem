package com.gymmate.services;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gymmate.daos.PaymentDAO;
import com.gymmate.dtos.PaymentResponseDto;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class PaymentServiceImpl implements PaymentService {
	private final PaymentDAO pdao;
	private final ModelMapper mapper;
	@Override
	public List<PaymentResponseDto> getAllPayments() {
		
		return pdao.findAll().stream()
				.map(payment->mapper.map(payment,PaymentResponseDto.class))
				.toList();
	}

}
