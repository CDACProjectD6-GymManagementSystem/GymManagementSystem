package com.gymmate.services;

import com.gymmate.dtos.ApiResponse;
import com.gymmate.dtos.DietRespDTO;
import com.gymmate.dtos.UserDisplayProfileDto;
import com.gymmate.dtos.UserLoginDTO;
import com.gymmate.dtos.UserLoginResponseDTO;
import com.gymmate.dtos.UserRegistrationDTO;

public interface UserService {

	UserDisplayProfileDto getProfile(Long id);

	boolean addProfile(UserDisplayProfileDto user);

	boolean updateProfile(Long id, UserDisplayProfileDto user);
	
	DietRespDTO getDiet(Long id);

	ApiResponse registerUser(UserRegistrationDTO userRegistrationDTO);

	UserLoginResponseDTO userLogin(UserLoginDTO userLoginDTO);

 
}
