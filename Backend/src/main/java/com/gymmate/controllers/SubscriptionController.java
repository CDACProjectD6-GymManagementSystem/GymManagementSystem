package com.gymmate.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gymmate.dtos.SubscriptionRequestDTO;
import com.gymmate.dtos.SubscriptionRespDto;
import com.gymmate.services.SubscriptionService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/subscription")
@AllArgsConstructor
public class SubscriptionController {
	private final SubscriptionService subscriptionService;
	
	@PostMapping
	@Operation(description = "Add a Subscription")
	public ResponseEntity<?> addSubscription(@RequestBody SubscriptionRequestDTO subDto){
		
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(subscriptionService.addSubscription(subDto));
	}
	
	@GetMapping
	@Operation(description = "Get All Subscriptions")
	public  ResponseEntity<?> getSubscriptions(){
		List<SubscriptionRespDto> list=subscriptionService.getAllSubscriptions();
		if(list.isEmpty())
			return ResponseEntity.noContent().build();
		
		return ResponseEntity.ok(list);
	}
}
