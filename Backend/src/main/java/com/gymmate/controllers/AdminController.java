package com.gymmate.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gymmate.dtos.UserSubscriptionAddDto;
import com.gymmate.services.AdminService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/admin")
@AllArgsConstructor
public class AdminController {
	private final AdminService adminService;
	
	@PostMapping("/add-user")
	@Operation(description = "Add a User by Admin")
	public ResponseEntity<?> addUser(@RequestBody UserSubscriptionAddDto userAddDto){
		return ResponseEntity.status(HttpStatus.CREATED).body(adminService.addUser(userAddDto));
	}
}
