package com.gymmate.controllers;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.gymmate.dtos.ApiResponse;
import com.gymmate.dtos.FeedbackDTO;
import com.gymmate.dtos.UserDisplayProfileDto;
import com.gymmate.dtos.UserLoginDTO;
import com.gymmate.dtos.UserLoginResponseDTO;
import com.gymmate.dtos.UserPaymentRequestDTO;
import com.gymmate.dtos.UserRegistrationDTO;
import com.gymmate.services.MongoFeedbackService;
import com.gymmate.services.UserService;

@RestController

@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private MongoFeedbackService feedbackService;

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

	@PostMapping("/register")
	@CrossOrigin(origins = "*")
	public ResponseEntity<?> registerUser(@RequestBody UserRegistrationDTO userRegistrationDTO) {
		ApiResponse response = userService.registerUser(userRegistrationDTO);

		if (response.getMessage().toLowerCase().contains("email is already")) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
		} else if (response.getMessage().toLowerCase().contains("user added")) {
			return ResponseEntity.status(HttpStatus.CREATED).body(response);
		} else {
			return ResponseEntity.badRequest().body(response);
		}

	}

	@PostMapping("/login")
	@CrossOrigin(origins = "*")
	public ResponseEntity<?> userLogin(@RequestBody UserLoginDTO userLoginDTO) {
		UserLoginResponseDTO user = userService.userLogin(userLoginDTO);

		if (user != null) {
			return ResponseEntity.ok(user);
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
		}
	}

	@GetMapping("/available-subscriptions")
	public ResponseEntity<?> getAvailableSubscriptions() {
		return ResponseEntity.ok().body(userService.getAvailableSubscriptions());

	}

	@GetMapping("/getdiet/{Id}")
	public ResponseEntity<?> getDiet(@PathVariable Long Id) {
		return ResponseEntity.ok().body(userService.getUserDiet(Id));

	}

	@GetMapping("/get-schedule/{Id}")
	public ResponseEntity<?> getSchedule(@PathVariable Long Id) {
		return ResponseEntity.ok().body(userService.getUserSchedule(Id));

	}

	@PostMapping("/feedback/{Id}")
	public ResponseEntity<?> addFeedback(@RequestBody FeedbackDTO feedbackDTO, @PathVariable String Id) {
		return ResponseEntity.ok().body(feedbackService.addFeedback(feedbackDTO, Id));
	}

	@PostMapping("/buy-package/{Id}")
	public ResponseEntity<?> buySubscription(@RequestBody UserPaymentRequestDTO paymentDTO, @PathVariable Long Id) {

		return ResponseEntity.ok().body(userService.buySubscription(paymentDTO, Id));
	}

	@PostMapping("/upload-photo/{id}")
	public ResponseEntity<?> uploadProfilePhoto(@PathVariable Long id, @RequestParam("file") MultipartFile file)
			throws IOException {
		Map<String, String> result = userService.uploadPhoto(id, file);
		return ResponseEntity.ok(result);
	}

	@DeleteMapping("/delete-photo/{id}")
	public ResponseEntity<?> deleteProfilePhoto(@PathVariable Long id) throws IOException {
		ApiResponse resp = userService.deletePhoto(id);
		return ResponseEntity.ok(resp);
	}

	@GetMapping("/get-trainer/{id}")
	public ResponseEntity<?> getAssignedTrainer(@PathVariable Long id) {
		return ResponseEntity.ok(userService.getTrainer(id));
	}

}