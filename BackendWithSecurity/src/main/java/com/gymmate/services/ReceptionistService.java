package com.gymmate.services;

import java.util.List;

import com.gymmate.dtos.ApiResponse;
import com.gymmate.dtos.ReceptionistRequestDto;
import com.gymmate.dtos.ReceptionistRespDto;
import com.gymmate.dtos.ReceptionistUpdateDto;
import com.gymmate.dtos.TrainerAssignmentDTO;
import com.gymmate.dtos.UserEntityResponseDto;
import com.gymmate.dtos.UserSubscriptionAddDto;
import com.gymmate.dtos.UserSubscriptionUpdateDto;
import com.gymmate.dtos.UserTrainerNameDTO;

public interface ReceptionistService {
	public UserTrainerNameDTO getTrainers();

	public ApiResponse setTrainer(TrainerAssignmentDTO trainerAssignmentDTO);

	public ApiResponse addReceptionist(ReceptionistRequestDto addDto);

	public List<ReceptionistRespDto> getAllReceptionist();

	public ApiResponse deleteReceptionist(Long id);

	public ApiResponse updateReceptionist(ReceptionistUpdateDto updatedto, Long id);
	
	ApiResponse addUser(UserSubscriptionAddDto userAddDto);

	ApiResponse softDeleteUser(Long userId);

	ApiResponse updateUser(UserSubscriptionUpdateDto userUpdatedto, Long userId);

	List<UserEntityResponseDto> getActiveUsers();
	
}
