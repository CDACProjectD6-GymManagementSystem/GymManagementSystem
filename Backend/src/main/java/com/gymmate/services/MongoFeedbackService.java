package com.gymmate.services;

import com.gymmate.dtos.ApiResponse;
import com.gymmate.dtos.FeedbackDTO;

public interface MongoFeedbackService {

	ApiResponse addFeedback(FeedbackDTO feedbackDTO,String Id);

}
