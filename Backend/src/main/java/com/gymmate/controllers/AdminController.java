package com.gymmate.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gymmate.dtos.UserSubscriptionAddDto;
import com.gymmate.entities.UserEntity;
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
	
	@DeleteMapping("/delete-user/{userId}")
	@Operation(description = "Softdeleting a user")
	public ResponseEntity<?> softDeleteUser(@PathVariable Long userId){
		return ResponseEntity.status(HttpStatus.OK).body(adminService.softDeleteUser(userId));
	}
	
}
