package com.gymmate.services;

import java.util.List;

import com.gymmate.dtos.ApiResponse;
import com.gymmate.dtos.ReceptionistRequestDto;
import com.gymmate.dtos.ReceptionistRespDto;
import com.gymmate.dtos.ReceptionistUpdateDto;
import com.gymmate.dtos.TrainerAssignmentDTO;
import com.gymmate.dtos.UserTrainerNameDTO;

public interface ReceptionistService {
	public UserTrainerNameDTO getTrainers();

	public ApiResponse setTrainer(TrainerAssignmentDTO trainerAssignmentDTO);

	public ApiResponse addReceptionist(ReceptionistRequestDto addDto);

	public List<ReceptionistRespDto> getAllReceptionist();

	public ApiResponse deleteReceptionist(Long id);

	public ApiResponse updateReceptionist(ReceptionistUpdateDto updatedto, Long id);
	
	
}
