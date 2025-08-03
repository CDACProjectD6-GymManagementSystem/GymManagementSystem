package com.gymmate.daos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.gymmate.entities.Admin;

public interface AdminDao extends JpaRepository<Admin, Long> {
	@Query("select u from Admin u where u.email=:email")
	Optional<Admin> findByEmailAddress(String email);
}
