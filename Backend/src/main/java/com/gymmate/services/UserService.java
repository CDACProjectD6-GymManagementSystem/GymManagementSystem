package com.gymmate.services;

import com.gymmate.dtos.DietRespDTO;
import com.gymmate.dtos.UserDisplayProfileDto;

public interface UserService {

	UserDisplayProfileDto getProfile(Long id);

	boolean addProfile(UserDisplayProfileDto user);

	boolean updateProfile(Long id, UserDisplayProfileDto user);

	DietRespDTO getDiet(Long id);

}
