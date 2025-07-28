package com.gymmate.services;

import java.util.List;

import com.gymmate.dtos.ApiResponse;
import com.gymmate.dtos.SubscriptionRequestDTO;
import com.gymmate.dtos.SubscriptionRespDto;

public interface SubscriptionService {

	ApiResponse addSubscription(SubscriptionRequestDTO subDto);

	List<SubscriptionRespDto> getAllSubscriptions();

	List<String> getName();

}
