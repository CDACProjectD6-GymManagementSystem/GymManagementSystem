package com.gymmate.services;

import java.util.List;

import com.gymmate.dtos.ApiResponse;
import com.gymmate.dtos.UserEntityResponseDto;
import com.gymmate.dtos.UserSubscriptionAddDto;
import com.gymmate.dtos.UserSubscriptionUpdateDto;

public interface AdminService {

	ApiResponse addUser(UserSubscriptionAddDto userAddDto);

	ApiResponse softDeleteUser(Long userId);

	ApiResponse updateUser(UserSubscriptionUpdateDto userUpdatedto, Long userId);

	List<UserEntityResponseDto> getActiveUsers();

}
