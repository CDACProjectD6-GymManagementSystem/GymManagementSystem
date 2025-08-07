package com.gymmate.services;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gymmate.customexception.ApiException;
import com.gymmate.customexception.ResourceNotFoundException;
import com.gymmate.daos.SubscriptionDao;
import com.gymmate.dtos.ApiResponse;
import com.gymmate.dtos.SubscriptionRequestDTO;
import com.gymmate.dtos.SubscriptionRespDto;
import com.gymmate.entities.Subscription;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class SubscriptionServiceImpl implements SubscriptionService {

    private final ModelMapper mapper;
	private final SubscriptionDao subscriptionDao;

	@Override
	public ApiResponse addSubscription(SubscriptionRequestDTO subDto) {
		if(subscriptionDao.existsByName(subDto.getName())) 
			throw new ApiException("Subscription Already Exists!!");
		
		Subscription subEntity = mapper.map(subDto, Subscription.class);
		subEntity.setActive(true);
		subEntity.setDurationInDays(30*subEntity.getDuration());
		subscriptionDao.save(subEntity);
		return new ApiResponse("Subscription Created Successfully");
	}

	@Override
	public List<SubscriptionRespDto> getAllSubscriptions() {
		
		return subscriptionDao.findByIsActiveTrue().stream()
				.map(sub -> mapper.map(sub, SubscriptionRespDto.class))
				.toList();
	}

	@Override
	public List<String> getName() {
		
		return subscriptionDao.findByIsActiveTrue().stream().map(sub->sub.getName()).toList();
	}

	@Override
	public ApiResponse softDelete(Long subId) {
		Subscription subEntity = subscriptionDao.findById(subId)
		.orElseThrow(()-> new ResourceNotFoundException("Subscription not found"));
		subEntity.setActive(false);
		return new ApiResponse("Subscription Deleted Successfully");
	}

	@Override
	public ApiResponse updateSubscription(SubscriptionRequestDTO updateDto, Long subId) {
		Subscription entity=subscriptionDao.findById(subId).
		orElseThrow(()->new ResourceNotFoundException("Subscription Not found"));
		mapper.map(updateDto, entity);
		return new ApiResponse("Subscription Updated");
	}

}
