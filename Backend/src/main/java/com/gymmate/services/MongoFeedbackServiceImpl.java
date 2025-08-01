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

		Feedback fdd = mapper.map(feedbackDTO, Feedback.class);
		fdd.setId(Id.toString());
		feedbackDao.save(fdd);
		return new ApiResponse("Feedback Added Successfully");
	}

}
