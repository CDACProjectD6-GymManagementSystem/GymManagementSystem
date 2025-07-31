package com.gymmate.services;

import java.util.List;

import com.gymmate.dtos.ApiResponse;
import com.gymmate.dtos.DietRespDTO;
import com.gymmate.dtos.SubscriptionResponseForUserDTO;
import com.gymmate.dtos.UserDietRespDTO;
import com.gymmate.dtos.UserDisplayProfileDto;
import com.gymmate.dtos.UserLoginDTO;
import com.gymmate.dtos.UserLoginResponseDTO;
import com.gymmate.dtos.UserRegistrationDTO;
import com.gymmate.dtos.UserScheduleRespDTO;

public interface UserService {

	UserDisplayProfileDto getProfile(Long id);

	boolean addProfile(UserDisplayProfileDto user);

	boolean updateProfile(Long id, UserDisplayProfileDto user);
	
	DietRespDTO getDiet(Long id);

	ApiResponse registerUser(UserRegistrationDTO userRegistrationDTO);

	UserLoginResponseDTO userLogin(UserLoginDTO userLoginDTO);

	List<SubscriptionResponseForUserDTO> getAvailableSubscriptions();

	UserDietRespDTO getUserDiet(Long id);

	UserScheduleRespDTO getUserSchedule(Long id);


}
