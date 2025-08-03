package com.gymmate.daos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.gymmate.dtos.UserLoginDTO;
import com.gymmate.entities.UserEntity;

public interface UserDao extends JpaRepository<UserEntity, Long> {

	Optional<UserEntity> findById(Long id);

	List<UserEntity> findByTrainer_IdAndIsActiveTrue(Long trainerId);

	boolean existsByEmail(String email);

	List<UserEntity> findByIsActiveTrue();

	UserEntity findByEmailAndPassword(String email, String password);

	UserEntity findByEmail(String email);

	@Query("select u from UserEntity u where u.email=:email")
	Optional<UserEntity> findByEmailAddress(String email);

	@Query(nativeQuery = true,value = "select count(*) from users where is_active=true")
	int getActiveUsersCount();
	
	@Query(nativeQuery = true,value = "select count(*) from users")
	int getAllUsersCount();

}
