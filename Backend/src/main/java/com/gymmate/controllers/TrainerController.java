package com.gymmate.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gymmate.dtos.TrainerDTO;
import com.gymmate.services.TrainerService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/trainer")
@CrossOrigin(origins = "*")
public class TrainerController {
	private final TrainerService trainerService;
	
	
	@GetMapping("/profile/{trainerId}")
	@Operation(description = "Get trainer profile details")
	public ResponseEntity<?> getTrainerDetails(@PathVariable Long trainerId){
		System.out.println("in getting trainer details " + trainerId);
		
		return ResponseEntity.ok(trainerService.getTrainerDetails(trainerId));
	}
	
	
	
	@PutMapping("/{trainerId}")
	@Operation(description = "Update trainers profile")
	public ResponseEntity<?> updateTrainerDetails(@PathVariable Long trainerId, @RequestBody TrainerDTO dto){
		System.out.println("In update" + trainerId + " " + dto);
		return ResponseEntity.ok(trainerService.updateDetails(trainerId, dto));

	}
	
	
	@GetMapping("/{trainerId")
	@Operation(description = "Get assigned users")
	public ResponseEntity<?> getAssignedUser(@PathVariable Long trainerId){
		System.out.println("In getting the number of users assigned");
		return ResponseEntity.ok(trainerService.getAssignedUsers(trainerId));
	}
	

}
