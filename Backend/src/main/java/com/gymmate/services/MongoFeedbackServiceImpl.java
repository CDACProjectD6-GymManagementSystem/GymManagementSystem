package com.gymmate.services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gymmate.daos.MongoFeedbackDao;
import com.gymmate.dtos.ApiResponse;
import com.gymmate.dtos.FeedbackDTO;
import com.gymmate.mongoentity.Feedback;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class MongoFeedbackServiceImpl implements MongoFeedbackService {
	@Autowired
	private MongoFeedbackDao feedbackDao;
	@Autowired
	private ModelMapper mapper;

	@Override
	public ApiResponse addFeedback(FeedbackDTO feedbackDTO, String Id) {

		Feedback newFeedback = new Feedback();
		newFeedback.setUserId(Id);
		newFeedback.setMessage(feedbackDTO.getMessage());
		newFeedback.setRating(feedbackDTO.getRating());

		feedbackDao.save(newFeedback);
		return new ApiResponse("Feedback Added Successfully");
	}

}
