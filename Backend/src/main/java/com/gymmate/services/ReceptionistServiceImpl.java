package com.gymmate.services;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gymmate.customexception.ResourceNotFoundException;
import com.gymmate.daos.AdminDao;
import com.gymmate.daos.TrainerDao;
import com.gymmate.daos.UserDao;
import com.gymmate.dtos.ApiResponse;
import com.gymmate.dtos.TrainerAssignmentDTO;
import com.gymmate.dtos.TrainerNameForReceptionistDTO;
import com.gymmate.dtos.UserNameForReceptonistDTO;
import com.gymmate.dtos.UserTrainerNameDTO;
import com.gymmate.entities.Trainer;
import com.gymmate.entities.UserEntity;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ReceptionistServiceImpl implements ReceptionistService {

	private final AdminDao adminDao;
	@Autowired
	private UserDao userDao;
	@Autowired
	private TrainerDao trainerDao;
	@Autowired
	private ModelMapper mapper;
	UserTrainerNameDTO userTrainerNameDTO = new UserTrainerNameDTO();

	ReceptionistServiceImpl(AdminDao adminDao) {
		this.adminDao = adminDao;
	}

	public UserTrainerNameDTO getTrainers() {

		List<UserEntity> ulist = userDao.findAll();
		List<Trainer> tlist = trainerDao.findAll();
		List<UserNameForReceptonistDTO> userName = ulist.stream()
				.map(u -> new UserNameForReceptonistDTO(u.getFirstName(), u.getId())).collect(Collectors.toList());
		List<TrainerNameForReceptionistDTO> trainerName = tlist.stream()
				.map(t -> new TrainerNameForReceptionistDTO(t.getFirstName(), t.getId())).collect(Collectors.toList());
		userTrainerNameDTO.setTrainerNameList(trainerName);
		userTrainerNameDTO.setUserNameList(userName);
		return userTrainerNameDTO;
	}  

	@Override
	public ApiResponse setTrainer(TrainerAssignmentDTO trainerAssignmentDTO) {
		UserEntity userEnt = userDao.findById(trainerAssignmentDTO.getUserId())
				.orElseThrow(() -> new ResourceNotFoundException("User Not Found"));
		Trainer trainerEnt = trainerDao.findById(trainerAssignmentDTO.getTrainerId())
				.orElseThrow(() -> new ResourceNotFoundException("Trainer Not Found"));
		userEnt.setTrainer(trainerEnt);
		userDao.save(userEnt);
		return new ApiResponse("Trainer Assigned Successfully");
	}

}
