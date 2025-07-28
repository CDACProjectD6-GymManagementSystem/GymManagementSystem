package com.gymmate.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gymmate.dtos.UserDisplayProfileDto;
import com.gymmate.services.UserService;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@RestController
@AllArgsConstructor
@NoArgsConstructor
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {
	@Autowired
	private UserService userService;

	@GetMapping("/profile/{Id}")
	public ResponseEntity<?> getUserProfile(@PathVariable Long Id) {

		return ResponseEntity.ok().body(userService.getProfile(Id));
	}

	@PostMapping("/profile")
	public ResponseEntity<?> addUserProfile(@RequestBody UserDisplayProfileDto user) {

		return ResponseEntity.ok().body(userService.addProfile(user));
	}

	@PostMapping("/profile/{Id}")
	public ResponseEntity<?> updateUserProfile(@PathVariable Long Id, @RequestBody UserDisplayProfileDto user) {

		return ResponseEntity.ok().body(userService.updateProfile(Id, user));
	}
	
	@GetMapping("/diet/{Id}")
	public ResponseEntity<?>getDiet(@PathVariable Long Id){
		return ResponseEntity.ok().body(userService.getDiet(Id));
	}
}
