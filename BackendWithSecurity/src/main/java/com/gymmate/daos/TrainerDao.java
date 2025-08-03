package com.gymmate.daos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.gymmate.entities.Trainer;
import com.gymmate.entities.UserEntity;

public interface TrainerDao extends JpaRepository<Trainer, Long> {

	boolean existsByEmail(String email);

	@Query("select u from Trainer u where u.email=:email")
	Optional<Trainer> findByEmailAddress(String email);

	@Query(nativeQuery = true,value = "select count(*) from trainers")
	int getCount();

}
