package com.gymmate.services;

import com.gymmate.dtos.ApiResponse;
import com.gymmate.dtos.UserSubscriptionAddDto;

public interface AdminService {

	ApiResponse addUser(UserSubscriptionAddDto userAddDto);

}
