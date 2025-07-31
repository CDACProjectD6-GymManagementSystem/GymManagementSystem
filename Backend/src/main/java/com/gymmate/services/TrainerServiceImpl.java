package com.gymmate.services;

import java.time.LocalDateTime;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

import com.gymmate.customexception.ResourceNotFoundException;
import com.gymmate.daos.DietDao;
import com.gymmate.daos.ScheduleDao;
import com.gymmate.daos.TrainerDao;
import com.gymmate.daos.UserDao;
import com.gymmate.dtos.ApiResponse;
import com.gymmate.dtos.TrainerDTO;
import com.gymmate.dtos.UserDietDTO;
import com.gymmate.dtos.UserForTrainerDTO;
import com.gymmate.dtos.UserScheduleDTO;
import com.gymmate.entities.Diet;
import com.gymmate.entities.Schedule;
import com.gymmate.entities.Trainer;
import com.gymmate.entities.UserEntity;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class TrainerServiceImpl implements TrainerService {
	
	@Autowired
	private final TrainerDao trainerDao;
	@Autowired
	private final ModelMapper modelMapper;
	@Autowired
	private final UserDao userDao;
	@Autowired
	private DietDao dietDao;
	@Autowired
	private ScheduleDao scheduleDao;
	
	
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
	public List<UserForTrainerDTO> getAssignedUsers(Long trainerId) {
	    List<UserEntity> users = userDao.findByTrainer_IdAndIsActiveTrue(trainerId);
	    return users.stream()
	            .map(user -> modelMapper.map(user, UserForTrainerDTO.class))
	            .toList();
	}

	
	
	@Override
	public UserForTrainerDTO getUserDetails(Long userId) {
		UserEntity entity = userDao.findById(userId).orElseThrow(()-> new ResourceAccessException("User is not present"));	
		return modelMapper.map(entity, UserForTrainerDTO.class);
	}

	
	

	@Override
	public UserDietDTO getUserDiet(Long userId) {
		UserEntity entity = userDao.findById(userId).orElseThrow(() -> new ResourceAccessException("User is not present"));	
		return modelMapper.map(entity, UserDietDTO.class);
		
	}

	@Override
	public ApiResponse updateUserDiet(Long userId, UserDietDTO dto) {

	    UserEntity entity = userDao.findById(userId)
	        .orElseThrow(() -> new ResourceAccessException("User is not present"));


	    Diet existingDiet = entity.getDiet();

	    if (existingDiet == null) {
	
	        Diet newDiet = modelMapper.map(dto.getDiet(), Diet.class);
	        newDiet.setUpdatedTime(LocalDateTime.now());

	        dietDao.save(newDiet);
	        entity.setDiet(newDiet);
	    } else {

	        modelMapper.map(dto.getDiet(), existingDiet);
	        existingDiet.setUpdatedTime(LocalDateTime.now());

	        dietDao.save(existingDiet);
	    }


	    userDao.save(entity);

	    return new ApiResponse("Updated user diet");
	}


	@Override
	public UserScheduleDTO getUserSchedule(Long userId) {
		// TODO Auto-generated method stub
		UserEntity entity = userDao.findById(userId).orElseThrow(() -> new ResourceAccessException("User is not present"));	
		return modelMapper.map(entity, UserScheduleDTO.class);
	}

	
	
	
	
	
	@Override
	public ApiResponse updateUserSchedule(Long userId, UserScheduleDTO dto) {

	    UserEntity entity = userDao.findById(userId)
	        .orElseThrow(() -> new ResourceAccessException("User is not present"));

	    Schedule existingSchedule = entity.getSchedule();

	    if (existingSchedule == null) {
	        Schedule newSchedule = modelMapper.map(dto.getSchedule(), Schedule.class);
	        newSchedule.setUpdatedTime(LocalDateTime.now());

	        scheduleDao.save(newSchedule);
	        entity.setSchedule(newSchedule);
	    } else {
	        modelMapper.map(dto.getSchedule(), existingSchedule);
	        existingSchedule.setUpdatedTime(LocalDateTime.now());

	        scheduleDao.save(existingSchedule);
	    }

	    userDao.save(entity);

	    return new ApiResponse("Updated user schedule");
	}

		
}
