package com.gymmate.controllers;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.gymmate.dtos.TrainerAssignmentDTO;
import com.gymmate.dtos.UserSubscriptionAddDto;
import com.gymmate.dtos.UserSubscriptionUpdateDto;
import com.gymmate.dtos.UserTrainerNameDTO;
import com.gymmate.services.ReceptionistService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "*")
//@AllArgsConstructor
@RequiredArgsConstructor
 @RequestMapping("/receptionist")
 public class ReceptionistController {

//	@Autowired
	public final ReceptionistService receptionistService;
	
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
	
	
	@PostMapping("/add-user")
	@Operation(description = "Add a User by Receptionist")
	public ResponseEntity<?> addUser(@RequestBody UserSubscriptionAddDto userAddDto){
		System.out.println(userAddDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(receptionistService.addUser(userAddDto));
	}
	
	
	
	@GetMapping("/get-users")
	@Operation(description = "Get Active Users")
	public ResponseEntity<?> getActiveUsers(){
		return ResponseEntity.status(HttpStatus.OK).body(receptionistService.getActiveUsers());
	}
	
	
	@DeleteMapping("/delete-user/{userId}")
	@Operation(description = "Deleting a user")
	public ResponseEntity<?> deleteUser(@PathVariable Long userId){
		return ResponseEntity.status(HttpStatus.OK).body(receptionistService.deleteUser(userId));
	}
	@PutMapping("/update-user/{userId}")
	@Operation(description = "Updating a user")
	public ResponseEntity<?> updateUser(@RequestBody UserSubscriptionUpdateDto userUpdatedto,@PathVariable Long userId)
	{
		return ResponseEntity.status(HttpStatus.OK).body(receptionistService.updateUser(userUpdatedto,userId));
	}
	
	
}
