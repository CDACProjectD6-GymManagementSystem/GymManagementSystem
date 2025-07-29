package com.gymmate.services;

import java.util.List;

import com.gymmate.dtos.ApiResponse;
import com.gymmate.dtos.TrainerDTO;
import com.gymmate.dtos.UserDietDTO;
import com.gymmate.dtos.UserForTrainerDTO;
import com.gymmate.dtos.UserScheduleDTO;

public interface TrainerService {

	TrainerDTO getTrainerDetails(Long trainerId);

	ApiResponse updateDetails(Long trainerId, TrainerDTO dto);

	List<UserForTrainerDTO> getAssignedUsers(Long trainerId);


	UserForTrainerDTO getUserDetails(Long userId);

	UserDietDTO getUserDiet(Long userId);

	ApiResponse updateUserDiet(Long userId, UserDietDTO dto);

	UserScheduleDTO getUserSchedule(Long userId);

	ApiResponse updateUserSchedule(Long userId, UserScheduleDTO dto);
	
	
}


