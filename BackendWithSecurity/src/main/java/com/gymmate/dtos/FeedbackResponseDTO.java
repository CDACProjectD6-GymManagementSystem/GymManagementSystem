package com.gymmate.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FeedbackResponseDTO {
	private String userId;
	private String firstName;
	private String lastName;
    private String message;
    private String trainerName;
    private int rating;  
}
