package com.gymmate.daos;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.gymmate.mongoentity.Feedback;

public interface MongoFeedbackDao extends MongoRepository<Feedback, String>{

}
