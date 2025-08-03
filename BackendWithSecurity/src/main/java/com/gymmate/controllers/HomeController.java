package com.gymmate.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gymmate.services.SubscriptionService;

import lombok.AllArgsConstructor;

@RestController
@CrossOrigin("*")
@AllArgsConstructor
public class HomeController {
	private final SubscriptionService subscriptionService;
	
	@GetMapping("/subscriptions")
	public ResponseEntity<?> getSubscriptions(){	
		return ResponseEntity.ok(subscriptionService.getAllSubscriptions());
	}
	
	
}
