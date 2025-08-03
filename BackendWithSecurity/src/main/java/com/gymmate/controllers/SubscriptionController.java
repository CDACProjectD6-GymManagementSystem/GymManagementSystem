package com.gymmate.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
@CrossOrigin(origins = "*")
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
	
	@GetMapping("/getnames")
	@Operation(description="Get only name of subscription")
	public ResponseEntity<?> getNames(){
		return ResponseEntity.ok(subscriptionService.getName());
	}
	
	@DeleteMapping("/{subId}")
	@Operation(description="Get only name of subscription")
	public ResponseEntity<?> softDeleteSubscription(@PathVariable Long subId){
		return ResponseEntity.ok(subscriptionService.softDelete(subId));
	}
	
	@PutMapping("/{subId}")
	@Operation(description = "Update a subscription")
	public ResponseEntity<?> updateSubscription(@RequestBody SubscriptionRequestDTO updateDto,@PathVariable Long subId)
	{
		return ResponseEntity.ok(subscriptionService.updateSubscription(updateDto,subId));
	}
	
}
