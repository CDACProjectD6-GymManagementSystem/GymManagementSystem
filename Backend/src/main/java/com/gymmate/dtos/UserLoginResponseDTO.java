package com.gymmate.dtos;

// DTO to return on login

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
 
public class UserLoginResponseDTO {
	private Long id;
	private String firstName;
	private String email;
	private boolean isSubscribed;
}
