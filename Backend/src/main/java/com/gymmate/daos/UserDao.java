package com.gymmate.daos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gymmate.entities.UserEntity;

public interface UserDao extends JpaRepository<UserEntity, Long>{

	Optional<UserEntity> findById(Long id);

	
}

