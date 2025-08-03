package com.gymmate.controllers;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gymmate.dtos.AuthResp;
import com.gymmate.dtos.UserLoginDTO;
import com.gymmate.security.JwtUtils;
import com.gymmate.services.UserService;

import lombok.AllArgsConstructor;

@RequestMapping("/auth")
@RestController
@AllArgsConstructor
public class AuthController {

    private final SecurityFilterChain configureFilterChain;

	private AuthenticationManager authenticationManager;
	private JwtUtils jwtUtils;
	private final UserService userService;

     

	@PostMapping("/signin")
	public ResponseEntity<?> userSignin(@RequestBody UserLoginDTO loginDTO) {
		// create token which is credentials right now
		UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
				loginDTO.getEmail(), loginDTO.getPassword());
		System.out.println("inside usersign in ........................");
		Authentication validAuthentication = authenticationManager.authenticate(authentication);
		System.out.println(validAuthentication.getPrincipal().getClass());
		System.out.println(validAuthentication.getPrincipal());// UserEntity
		System.out.println("after " + validAuthentication.isAuthenticated());// true
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(new AuthResp("Authentication Successful !!!!!!!", jwtUtils.generateJwtToken(validAuthentication)));

	}
}
