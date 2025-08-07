package com.gymmate.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gymmate.customexception.ApiException;
import com.gymmate.customexception.ResourceNotFoundException;
import com.gymmate.daos.MongoFeedbackDao;
import com.gymmate.daos.TrainerDao;
import com.gymmate.daos.UserDao;
import com.gymmate.dtos.ApiResponse;
import com.gymmate.dtos.FeedbackDTO;
import com.gymmate.dtos.FeedbackResponseDTO;
import com.gymmate.entities.Trainer;
import com.gymmate.entities.UserEntity;
import com.gymmate.mongoentity.Feedback;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class MongoFeedbackServiceImpl implements MongoFeedbackService {
	@Autowired
	private MongoFeedbackDao feedbackDao;
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private UserDao userdao;
	@Autowired
	private TrainerDao trainerDao;

	@Override
	public ApiResponse addFeedback(FeedbackDTO feedbackDTO, String Id) {

		Feedback newFeedback = new Feedback();
		newFeedback.setUserId(Id);
		newFeedback.setMessage(feedbackDTO.getMessage());
		newFeedback.setRating(feedbackDTO.getRating());
		System.out.println("trainerid in mongofeedack is " + feedbackDTO.getTrainerId());
		 
		Long trainerId = Long.parseLong(feedbackDTO.getTrainerId());
		Trainer trainer = trainerDao.findById(trainerId).orElseThrow(() -> new ApiException("no trainer found"));

		newFeedback.setTrainerName(trainer.getFirstName());

		feedbackDao.save(newFeedback);
		return new ApiResponse("Feedback Added Successfully");
	}

	@Override
	public List<FeedbackResponseDTO> getAllFeedbacks() {
		List<Feedback> list = feedbackDao.findAll();
		List<FeedbackResponseDTO> flist = new ArrayList<>();
		for (Feedback feed : list) {
			FeedbackResponseDTO fres = new FeedbackResponseDTO();
			Long userid = Long.parseLong(feed.getUserId());
			UserEntity uentity = userdao.findById(userid).orElseThrow(() -> new ResourceNotFoundException("Not found"));
			mapper.map(feed, fres);
			fres.setFirstName(uentity.getFirstName());
			fres.setLastName(uentity.getLastName());
			fres.setTrainerName(feed.getTrainerName());
			flist.add(fres);
		}
		return flist;
	}

}
