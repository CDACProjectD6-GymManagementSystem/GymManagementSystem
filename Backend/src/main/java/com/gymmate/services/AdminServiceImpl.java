package com.gymmate.services;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gymmate.customexception.ResourceNotFoundException;
import com.gymmate.daos.SubscriptionDao;
import com.gymmate.daos.UserDao;
import com.gymmate.dtos.ApiResponse;
import com.gymmate.dtos.UserSubscriptionAddDto;
import com.gymmate.entities.Subscription;
import com.gymmate.entities.UserEntity;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class AdminServiceImpl implements AdminService {

	private final SubscriptionDao subscriptionDao;
	private final UserDao userDao;
	private final ModelMapper mapper;
	@Override
	public ApiResponse addUser(UserSubscriptionAddDto userAddDto) {
		if(!subscriptionDao.existsByName(userAddDto.getSubscriptionType())) {
			throw new ResourceNotFoundException("Subscription Type not found");
		}
		UserEntity userEntity = mapper.map(userAddDto, UserEntity.class);
		Subscription subEntity = subscriptionDao.findByName(userAddDto.getSubscriptionType());
		userEntity.setSubscriptionId(subEntity);
		userDao.save(userEntity);
		return new ApiResponse("User Created");
	}

}
