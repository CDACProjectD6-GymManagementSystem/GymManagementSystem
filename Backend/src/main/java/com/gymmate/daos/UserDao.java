package com.gymmate.daos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gymmate.dtos.UserLoginDTO;
import com.gymmate.entities.UserEntity;

public interface UserDao extends JpaRepository<UserEntity, Long> {

	Optional<UserEntity> findById(Long id);

	List<UserEntity> findByTrainer_IdAndIsActiveTrue(Long trainerId);

	boolean existsByEmail(String email);

	List<UserEntity> findByIsActiveTrue();

	UserEntity findByEmailAndPassword(String email, String password);

	UserEntity findByEmail(String email);

}
