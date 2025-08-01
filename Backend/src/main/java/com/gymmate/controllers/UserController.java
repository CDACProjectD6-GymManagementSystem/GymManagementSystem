package com.gymmate.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gymmate.daos.MongoFeedbackDao;
import com.gymmate.daos.RoleDao;
import com.gymmate.dtos.FeedbackDTO;
import com.gymmate.dtos.UserDisplayProfileDto;
import com.gymmate.dtos.UserLoginDTO;
import com.gymmate.dtos.UserLoginResponseDTO;
import com.gymmate.dtos.UserRegistrationDTO;
import com.gymmate.services.MongoFeedbackService;
import com.gymmate.services.UserService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor

@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {

	@Autowired
	private UserService userService;
	@Autowired
	RoleDao roleDao;
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
		userService.registerUser(userRegistrationDTO);

		return ResponseEntity.ok().build();

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
	public ResponseEntity<?>addFeedback(@RequestBody FeedbackDTO feedbackDTO,@PathVariable String Id){
		return ResponseEntity.ok().body(feedbackService.addFeedback(feedbackDTO,Id));
	}

}