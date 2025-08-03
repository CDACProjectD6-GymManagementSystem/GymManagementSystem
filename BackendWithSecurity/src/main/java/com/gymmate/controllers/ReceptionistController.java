package com.gymmate.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gymmate.dtos.TrainerAssignmentDTO;
import com.gymmate.dtos.UserTrainerNameDTO;
import com.gymmate.services.ReceptionistService;

import lombok.AllArgsConstructor;

@RestController
@CrossOrigin(origins = "*")
@AllArgsConstructor
 @RequestMapping("/receptionist")
 public class ReceptionistController {

	@Autowired
	ReceptionistService receptionistService;
	@GetMapping("/get-trainers-users")
	@CrossOrigin(origins = "*")
	public ResponseEntity<?> getTrainersAndUsers() {
		return ResponseEntity.ok().body( receptionistService.getTrainers());
	}
	
	@PostMapping("/assign-trainer")
	@CrossOrigin(origins = "*")
	public ResponseEntity<?> setTraineroUser(@RequestBody TrainerAssignmentDTO trainerAssignmentDTO) {
		return ResponseEntity.ok().body( receptionistService.setTrainer(trainerAssignmentDTO));
	}
	
}
