package com.gymmate.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

import com.gymmate.daos.UserDao;
import com.gymmate.dtos.ApiResponse;
import com.gymmate.dtos.UserDietDTO;
import com.gymmate.dtos.UserDisplayProfileDto;
import com.gymmate.dtos.UserForTrainerDTO;
import com.gymmate.entities.Diet;
import com.gymmate.entities.Role;
import com.gymmate.entities.Role.UserRole;
import com.gymmate.entities.UserEntity;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class UserServiceImpl implements UserService {
	@Autowired
	private UserDao userDao;
	@Autowired
	private ModelMapper map;

	private Role role;

	@Override
	public UserDisplayProfileDto getProfile(Long id) {
		Optional<UserEntity> userProfile = userDao.findById(id);
		UserDisplayProfileDto userDto = map.map(userProfile, UserDisplayProfileDto.class);
		return userDto;
	}

	@Override
	public boolean addProfile(UserDisplayProfileDto user) {
		UserEntity userEnt = map.map(user, UserEntity.class);
		role.setEmail(user.getEmail());
		role.setRole(UserRole.ROLE_USER);
		userDao.save(userEnt);
		return true;
	}

	@Override
	public boolean updateProfile(Long id, UserDisplayProfileDto user) {
		UserEntity userEnt = userDao.findById(id).orElseThrow(() -> new ResourceAccessException("User is not present"));
		userEnt.setAddress(user.getAddress());
		userEnt.setEmail(user.getEmail());
		userEnt.setFirstName(user.getFirstName());
		userEnt.setLastName(user.getLastName());
		userEnt.setGender(user.getGender());
		userEnt.setMobile(user.getMobile());
		return true;
	}

	
	
	
	
}
