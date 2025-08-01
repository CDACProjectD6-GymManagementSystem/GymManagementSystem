package com.gymmate.dtos;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString()
public class TrainerDTO {
	
	private String firstName;
	private String lastName;
	private String email;
	private String mobile;
	private String certifications;
	private String imageUrl;        
	private String imagePublicId; 
	
}
