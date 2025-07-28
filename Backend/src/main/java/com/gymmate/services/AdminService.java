package com.gymmate.services;

import com.gymmate.dtos.ApiResponse;
import com.gymmate.dtos.UserSubscriptionAddDto;
import com.gymmate.entities.UserEntity;

public interface AdminService {

	ApiResponse addUser(UserSubscriptionAddDto userAddDto);

	ApiResponse softDeleteUser(Long userId);

}
