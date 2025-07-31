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

import com.gymmate.dtos.EquipmentRequestDto;
import com.gymmate.dtos.ReceptionistRequestDto;
import com.gymmate.dtos.ReceptionistUpdateDto;
import com.gymmate.dtos.SubscriptionRequestDTO;
import com.gymmate.dtos.SubscriptionRespDto;
import com.gymmate.dtos.UserSubscriptionAddDto;
import com.gymmate.dtos.UserSubscriptionUpdateDto;
import com.gymmate.entities.UserEntity;
import com.gymmate.services.AdminService;
import com.gymmate.services.EquipmentService;
import com.gymmate.services.ReceptionistService;
import com.gymmate.services.SubscriptionService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/admin")
@AllArgsConstructor
@CrossOrigin(origins="*")
public class AdminController {
	private final AdminService adminService;
	private final SubscriptionService subscriptionService;
	private final EquipmentService equipmentService;
	private final ReceptionistService receptionistService;
	
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
	
	@PutMapping("/update-user/{userId}")
	@Operation(description = "Updating a user")
	public ResponseEntity<?> updateUser(@RequestBody UserSubscriptionUpdateDto userUpdatedto,@PathVariable Long userId)
	{
		return ResponseEntity.status(HttpStatus.OK).body(adminService.updateUser(userUpdatedto,userId));
	}
	
	@GetMapping("/get-users")
	@Operation(description = "Get Active Users")
	public ResponseEntity<?> getActiveUsers(){
		return ResponseEntity.status(HttpStatus.OK).body(adminService.getActiveUsers());
	}
	
	@PostMapping("subscription/add-subscription")
	@Operation(description = "Add a Subscription")
	public ResponseEntity<?> addSubscription(@RequestBody SubscriptionRequestDTO subDto){
		
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(subscriptionService.addSubscription(subDto));
	}
	
	@GetMapping("/subscription")
	@Operation(description = "Get All Subscriptions")
	public  ResponseEntity<?> getSubscriptions(){
		List<SubscriptionRespDto> list=subscriptionService.getAllSubscriptions();
		if(list.isEmpty())
			return ResponseEntity.noContent().build();
		
		return ResponseEntity.ok(list);
	}
	
	@GetMapping("/subscription/getnames")
	@Operation(description="Get only name of subscription")
	public ResponseEntity<?> getNames(){
		return ResponseEntity.ok(subscriptionService.getName());
	}
	
	@DeleteMapping("/subscription/{subId}")
	@Operation(description="Get only name of subscription")
	public ResponseEntity<?> softDeleteSubscription(@PathVariable Long subId){
		return ResponseEntity.ok(subscriptionService.softDelete(subId));
	}
	
	@PutMapping("/subscription/{subId}")
	@Operation(description = "Update a subscription")
	public ResponseEntity<?> updateSubscription(@RequestBody SubscriptionRequestDTO updateDto,@PathVariable Long subId)
	{
		return ResponseEntity.ok(subscriptionService.updateSubscription(updateDto,subId));
	}
	
	@PostMapping("/equipment/add")
	@Operation(description = "Adding a equipment by admin")
	public ResponseEntity<?> addEquipment(@RequestBody EquipmentRequestDto addDto){
		return ResponseEntity.status(HttpStatus.CREATED).body(equipmentService.addEquipment(addDto));
	}
	
	@GetMapping("/equipment/getall")
	@Operation(description = "Get all Equipments not for maintenance")
	public ResponseEntity<?> getAllEquipments(){
		return ResponseEntity.ok(equipmentService.getAllEquipments());
	}
	
	@DeleteMapping("/equipment/{id}")
	@Operation(description = "Delete an equipment")
	public ResponseEntity<?> deleteEquipment(@PathVariable Long id){
		return ResponseEntity.ok(equipmentService.deleteEquipment(id));
	}
	
	@PutMapping("/equipment/{id}")
	@Operation(description = "Update an equipment")
	public ResponseEntity<?> updateEquipment(@RequestBody EquipmentRequestDto updateDto,@PathVariable Long id){
		return ResponseEntity.ok(equipmentService.updateEquipment(updateDto,id));
	}
	
	@PostMapping("/receptionist")
	@Operation(description = "Add a receptionist")
	public ResponseEntity<?> addReceptionist(@RequestBody ReceptionistRequestDto addDto){
		return ResponseEntity.ok(receptionistService.addReceptionist(addDto));
	}
	
	@GetMapping("/receptionist")
	@Operation(description = "Get all receptionists")
	public ResponseEntity<?> getAllReceptionist(){
		return ResponseEntity.ok(receptionistService.getAllReceptionist());
	}
	@DeleteMapping("/receptionist/delete/{id}")
	@Operation(description = "Delete a receptionist")
	public ResponseEntity<?> deleteReceptionist(@PathVariable Long id){
		return ResponseEntity.ok(receptionistService.deleteReceptionist(id));
	}
	
	@PutMapping("/receptionist/update/{id}")
	@Operation(description = "Update the receptionist")
	public ResponseEntity<?> updateReceptionist(@RequestBody ReceptionistUpdateDto updatedto,@PathVariable Long id){
		return ResponseEntity.ok(receptionistService.updateReceptionist(updatedto,id));
	}
	
}
