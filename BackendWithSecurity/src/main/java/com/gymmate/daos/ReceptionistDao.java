package com.gymmate.daos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.gymmate.entities.Receptionist;

public interface ReceptionistDao extends JpaRepository<Receptionist, Long>{


	boolean existsByEmail(String email);
	@Query("select u from Receptionist u where u.email=:email")
	Optional<Receptionist> findByEmailAddress(String email);
	
	@Query(nativeQuery = true,value = "select count(*) from receptionists")
	int getCount();
}
