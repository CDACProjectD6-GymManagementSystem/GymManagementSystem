package com.gymmate.services;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gymmate.customexception.ResourceNotFoundException;
import com.gymmate.daos.EquipmentDao;
import com.gymmate.daos.RoleDao;
import com.gymmate.daos.SubscriptionDao;
import com.gymmate.daos.UserDao;
import com.gymmate.dtos.ApiResponse;
import com.gymmate.dtos.UserEntityResponseDto;
import com.gymmate.dtos.UserSubscriptionAddDto;
import com.gymmate.dtos.UserSubscriptionUpdateDto;
import com.gymmate.entities.Role;
import com.gymmate.entities.Role.UserRole;
import com.gymmate.entities.Subscription;
import com.gymmate.entities.UserEntity;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final EquipmentDao equipmentDao;
	private final SubscriptionDao subscriptionDao;
	private final UserDao userDao;
	private final ModelMapper mapper;
	private final RoleDao rdao;

    @Override
	public ApiResponse addUser(UserSubscriptionAddDto userAddDto) {
		if (!subscriptionDao.existsByName(userAddDto.getSubscriptionType())) {
			throw new ResourceNotFoundException("Subscription Type not found");
		}
		if (userDao.existsByEmail(userAddDto.getEmail())) {
			throw new RuntimeException("A user with this email already exists");
		}
		UserEntity userEntity = mapper.map(userAddDto, UserEntity.class);
		Subscription subEntity = subscriptionDao.findByName(userAddDto.getSubscriptionType());
		userEntity.setSubscriptionId(subEntity);
		userEntity.setActive(true);
		userEntity.setSubscribed(true);
		Role r=mapper.map(userAddDto, Role.class);
		r.setRole(UserRole.ROLE_USER);
		userDao.save(userEntity);
		rdao.save(r);
		return new ApiResponse("User Created");
	}

	@Override
	public ApiResponse softDeleteUser(Long userId) {
		UserEntity userEntity = userDao.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User Not Found"));
		Role r=rdao.findByEmail(userEntity.getEmail());
		rdao.delete(r);
		userEntity.setActive(false); // SoftDeleting the User
		return new ApiResponse("User Deleted Successfully");
	}

	@Override
	public ApiResponse updateUser(UserSubscriptionUpdateDto userUpdatedto, Long userId) {
		UserEntity userEntity = userDao.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User Not Found"));
		if (!userEntity.getSubscriptionId().getName().equals(userUpdatedto.getSubscriptionType())) {
			Subscription subEntity = subscriptionDao.findByName(userUpdatedto.getSubscriptionType());
			userEntity.setSubscriptionId(subEntity);
		}
		Role r=rdao.findByEmail(userEntity.getEmail());
		mapper.map(userUpdatedto, userEntity);
		mapper.map(userUpdatedto, r);
		return new ApiResponse("User Updated Successfully");
	}

	@Override
	public List<UserEntityResponseDto> getActiveUsers() {

		List<UserEntity> list = userDao.findByIsActiveTrue();
		List<UserEntityResponseDto> subtypelist = new ArrayList<>();
		
		Subscription freeSubscription = subscriptionDao.findByName("Free");
	    if (freeSubscription == null) {
	        throw new ResourceNotFoundException("'Free' subscription not found in the database!");
	    }
		if (list!= null &&	!list.isEmpty()) {
			for (UserEntity user : list) {
				UserEntityResponseDto u1 = new UserEntityResponseDto();
				mapper.map(user, u1);
				 if (user.getSubscriptionId() != null) {
		                u1.setSubscriptionType(user.getSubscriptionId().getName());
		            } else {
		               user.setSubscriptionId(freeSubscription);
		               u1.setSubscriptionType(freeSubscription.getName());
		               userDao.save(user);
		            }
				subtypelist.add(u1);
			}
			
		}
		return subtypelist;
	}
}
