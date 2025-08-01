package com.gymmate.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

import com.gymmate.customexception.ResourceNotFoundException;
import com.gymmate.daos.RoleDao;
import com.gymmate.daos.SubscriptionDao;
import com.gymmate.daos.UserDao;
import com.gymmate.dtos.ApiResponse;
import com.gymmate.dtos.SubscriptionResponseForUserDTO;
import com.gymmate.dtos.UserDietRespDTO;
import com.gymmate.dtos.UserDisplayProfileDto;
import com.gymmate.dtos.UserLoginDTO;
import com.gymmate.dtos.UserLoginResponseDTO;
import com.gymmate.dtos.UserRegistrationDTO;
import com.gymmate.dtos.UserScheduleRespDTO;
import com.gymmate.entities.Diet;
import com.gymmate.entities.Role;
import com.gymmate.entities.Role.UserRole;
import com.gymmate.entities.Schedule;
import com.gymmate.entities.Subscription;
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
	@Autowired
	private SubscriptionDao subscriptionDao;

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

	@Override
	public List<SubscriptionResponseForUserDTO> getAvailableSubscriptions() {
		List<Subscription> subList = subscriptionDao.findAll();
		List<SubscriptionResponseForUserDTO> dietDTO = subList.stream()
				.map(u -> map.map(u, SubscriptionResponseForUserDTO.class)).collect(Collectors.toList());
		return dietDTO;
	}

	@Override
	public UserDietRespDTO getUserDiet(Long id) {
		UserEntity userEnt = userDao.findById(id).orElseThrow(() -> new ResourceNotFoundException("user not found"));
		Diet diet = userEnt.getDiet();
		if (diet == null) {
			diet = new Diet();
		}
		return map.map(diet, UserDietRespDTO.class);
	}

	@Override
	public UserScheduleRespDTO getUserSchedule(Long id) {
		UserEntity userEnt = userDao.findById(id).orElseThrow(() -> new ResourceNotFoundException("user not found"));
		Schedule schedule = userEnt.getSchedule();
		if (schedule == null) {
			schedule = new Schedule();

		}
		return map.map(schedule, UserScheduleRespDTO.class);
	}

}
