package com.gymmate.services;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

import com.gymmate.customexception.ResourceNotFoundException;
import com.gymmate.daos.RoleDao;
import com.gymmate.daos.UserDao;
import com.gymmate.dtos.ApiResponse;
import com.gymmate.dtos.DietRespDTO;
import com.gymmate.dtos.UserDisplayProfileDto;
import com.gymmate.dtos.UserLoginDTO;
import com.gymmate.dtos.UserLoginResponseDTO;
import com.gymmate.dtos.UserRegistrationDTO;
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
	@Autowired
	private RoleDao roleDao;

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

	@Override
	public DietRespDTO getDiet(Long id) {
		UserEntity user = userDao.findById(id).orElseThrow(() -> new ResourceNotFoundException("user Not found"));
		Diet diet = user.getDiet();
		DietRespDTO dietDto = map.map(diet, DietRespDTO.class);
		return dietDto;
	}

	@Override
	public ApiResponse registerUser(UserRegistrationDTO userRegistrationDTO) {
		UserEntity userBeforeActive = map.map(userRegistrationDTO, UserEntity.class);
		userBeforeActive.setActive(true);
		userDao.save(userBeforeActive);
		Role beforeRole = map.map(userRegistrationDTO, Role.class);
		beforeRole.setRole(UserRole.ROLE_USER);
		roleDao.save(beforeRole);

		return new ApiResponse("user added successfully");
	}

	@Override
	public UserLoginResponseDTO userLogin(UserLoginDTO userLoginDTO) {
		UserEntity userEnt = userDao.findByEmailAndPassword(userLoginDTO.getEmail(), userLoginDTO.getPassword());
		UserLoginResponseDTO user = map.map(userEnt, UserLoginResponseDTO.class);
		return user;
	}

}
