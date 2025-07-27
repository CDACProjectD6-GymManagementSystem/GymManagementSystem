package com.gymmate.services;

import com.gymmate.dtos.TrainerDTO;
import com.gymmate.entities.UserEntity;

import java.util.List;

import com.gymmate.dtos.ApiResponse;

public interface TrainerService {

	TrainerDTO getTrainerDetails(Long trainerId);

	ApiResponse updateDetails(Long trainerId, TrainerDTO dto);

	List<UserEntity> getAssignedUsers(Long trainerId);
	
	
}


