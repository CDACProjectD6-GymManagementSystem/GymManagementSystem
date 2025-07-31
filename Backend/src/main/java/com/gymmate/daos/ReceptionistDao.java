package com.gymmate.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gymmate.entities.Receptionist;

public interface ReceptionistDao extends JpaRepository<Receptionist, Long>{


	boolean existsByEmail(String email);

}
