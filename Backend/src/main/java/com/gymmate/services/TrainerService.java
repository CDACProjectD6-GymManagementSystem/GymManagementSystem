package com.gymmate.services;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.gymmate.dtos.ApiResponse;
import com.gymmate.dtos.TrainerDTO;
import com.gymmate.dtos.TrainerRequestDto;
import com.gymmate.dtos.TrainerRespDto;
import com.gymmate.dtos.TrainerUpdateDto;
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

	ApiResponse addTrainer(TrainerRequestDto addDto);

	List<TrainerRespDto> getAllTrainers();

	ApiResponse deleteTrainer(Long id);

	ApiResponse updateTrainer(Long id, TrainerUpdateDto updateDto);

    Map<String, String> uploadPhoto(Long id, MultipartFile file) throws IOException;
    
    
    ApiResponse deletePhoto(Long id) throws IOException;
	
	
	
	
}


