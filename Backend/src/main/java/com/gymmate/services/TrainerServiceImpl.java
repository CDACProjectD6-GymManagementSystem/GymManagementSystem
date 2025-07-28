package com.gymmate.services;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.gymmate.customexception.ResourceNotFoundException;
import com.gymmate.daos.TrainerDao;
import com.gymmate.dtos.ApiResponse;
import com.gymmate.dtos.TrainerDTO;
import com.gymmate.entities.Trainer;
import com.gymmate.entities.UserEntity;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import java.util.*;

@Service
@Transactional
@AllArgsConstructor
public class TrainerServiceImpl implements TrainerService {

	private final TrainerDao trainerDao;
	private final ModelMapper modelMapper;
	
	@Override
	public TrainerDTO getTrainerDetails(Long trainerId) {
	    Trainer entity = trainerDao.findById(trainerId)
	        .orElseThrow(() -> new ResourceNotFoundException("Trainer not found"));
	    return modelMapper.map(entity, TrainerDTO.class);
	}

	@Override
	public ApiResponse updateDetails(Long trainerId, TrainerDTO dto) {
	    Trainer entity = trainerDao.findById(trainerId)
	        .orElseThrow(() -> new ResourceNotFoundException("Update failed"));
	    System.out.println("BEFORE: " + entity.getFirstName());
	    modelMapper.map(dto, entity);  
	    System.out.println("AFTER: " + entity.getFirstName());
	    trainerDao.save(entity);       

	    return new ApiResponse("Profile updated!");
	}

	@Override
	public List<UserEntity> getAssignedUsers(Long trainerId) {
		// TODO Auto-generated method stub
		return null;
	}

}
