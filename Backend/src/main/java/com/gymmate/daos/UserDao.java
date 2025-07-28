package com.gymmate.daos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gymmate.entities.UserEntity;

public interface UserDao extends JpaRepository<UserEntity, Long>{

	Optional<UserEntity> findById(Long userId);

	boolean existsByEmail(String email);

	List<UserEntity> findByIsActiveTrue();


}

