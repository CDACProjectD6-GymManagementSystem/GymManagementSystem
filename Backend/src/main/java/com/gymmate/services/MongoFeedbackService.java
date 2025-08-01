package com.gymmate.services;

import java.util.List;

import com.gymmate.dtos.ApiResponse;
import com.gymmate.dtos.FeedbackDTO;
import com.gymmate.dtos.FeedbackResponseDTO;
import com.gymmate.mongoentity.Feedback;

public interface MongoFeedbackService {

	ApiResponse addFeedback(FeedbackDTO feedbackDTO,String Id);

	List<FeedbackResponseDTO> getAllFeedbacks();

}
