package com.gymmate.services;

import com.gymmate.dtos.ApiResponse;
import com.gymmate.dtos.TrainerAssignmentDTO;
import com.gymmate.dtos.UserTrainerNameDTO;

public interface ReceptionistService {
	public UserTrainerNameDTO getTrainers();

 
	public ApiResponse setTrainer(TrainerAssignmentDTO trainerAssignmentDTO);
}
