package com.gymmate.controllers;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.gymmate.dtos.ApiResponse;
import com.gymmate.dtos.EquipmentCategoryDTO;
import com.gymmate.dtos.TrainerDTO;
import com.gymmate.dtos.UserDietDTO;
import com.gymmate.dtos.UserScheduleDTO;
import com.gymmate.entities.Equipment;
import com.gymmate.services.EquipmentService;
import com.gymmate.services.ImageService;
import com.gymmate.services.TrainerService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/trainer")
@CrossOrigin(origins = "*")
public class TrainerController {
	private final TrainerService trainerService;
	private final EquipmentService equipmentService;
	private final ImageService imageService;
	
	
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
	
	
	@GetMapping("users/{trainerId}")
	@Operation(description = "Get assigned users")
	public ResponseEntity<?> getAssignedUser(@PathVariable Long trainerId){
		System.out.println("In getting the number of users assigned");
		return ResponseEntity.ok(trainerService.getAssignedUsers(trainerId));
	}
	
	
	
	
	
	
	@GetMapping("/user/{userId}")
	@Operation(description = "Get user profile")
	public ResponseEntity<?> getUserDetails(@PathVariable Long userId) {
	    return ResponseEntity.ok(trainerService.getUserDetails(userId));
	}

	
	
	@GetMapping("/user/{userId}/diet")
	@Operation(description = "Get user diet")
	public ResponseEntity<?> getUserDiet(@PathVariable Long userId){
		return ResponseEntity.ok(trainerService.getUserDiet(userId));
		
	}
	
	
	
	@PostMapping("/user/{userId}/diet")
	@Operation(description = "Update user diet")
	public ResponseEntity<?> updateUserDiet(@PathVariable Long userId, @RequestBody UserDietDTO dto){
		return ResponseEntity.ok(trainerService.updateUserDiet(userId, dto));
	}
	
	
	@GetMapping("/user/{userId}/schedule")
	@Operation(description = "Get user schedule")
	public ResponseEntity<?> getUserSchedule(@PathVariable Long userId){
		return ResponseEntity.ok(trainerService.getUserSchedule(userId));
		
	}
	
	
	@PostMapping("/user/{userId}/schedule")
	@Operation(description = "Update user schedule")
	public ResponseEntity<?> updateUserSchedule(@PathVariable Long userId, @RequestBody UserScheduleDTO dto){
		return ResponseEntity.ok(trainerService.updateUserSchedule(userId, dto));
	}
	
	
	@GetMapping("/equipments")
	@Operation(description = "Get equipment category counts")
	public ResponseEntity<List<EquipmentCategoryDTO>> getEquipmentsCategory() {
	    return ResponseEntity.ok(equipmentService.getEquipmentCategories());
	}
	
	@GetMapping("/equipments/cardio")
	@Operation(description = "Get cardio equipments")
	public ResponseEntity<List<Equipment>> getCardioEquipments(){
		return ResponseEntity.ok(equipmentService.getCardioEquipments());
	}
		
	@GetMapping("/equipments/strength")
	@Operation(description = "Get strength equipments")
	public ResponseEntity<List<Equipment>> getStrengthEquipments(){
		return ResponseEntity.ok(equipmentService.getStrengthEquipments());
	}
	
	@GetMapping("/equipments/flexibility")
	@Operation(description = "Get flexibilty equipments")
	public ResponseEntity<List<Equipment>> getFlexibiltyEquipments(){
		return ResponseEntity.ok(equipmentService.getFlexibiltyEquipments());
	}
	
	@GetMapping("/equipments/freeweights")
	@Operation(description = "Get freeweights equipments")
	public ResponseEntity<List<Equipment>> getFreeWeightEquipments(){
		return ResponseEntity.ok(equipmentService.FreeWeightEquipments());
	}

	
	@GetMapping("/equipments/resistancemachines")
	@Operation(description = "Get cardio equipments")
	public ResponseEntity<List<Equipment>> getResistanceEquipments(){
		return ResponseEntity.ok(equipmentService.getResistanceEquipments());
	}
	
	
	@PutMapping("/equipments/{id}/maintenance")
	@Operation(description = "Set and unset for maintenance")
	public ResponseEntity<ApiResponse> toggleMaintenance(@PathVariable Long id,
	                                                     @RequestBody Map<String, Boolean> body) {
	    return ResponseEntity.ok(equipmentService.toggleMaintenance(id, body));
	}

	       

	@PostMapping("/upload/{id}")
	public ResponseEntity<?> upload(@PathVariable Long id, @RequestParam("file") MultipartFile file) throws IOException {
	    return ResponseEntity.ok(trainerService.uploadPhoto(id, file));
	}


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) throws IOException {
        return ResponseEntity.ok(trainerService.deletePhoto(id));
    }
	
    
	


}
