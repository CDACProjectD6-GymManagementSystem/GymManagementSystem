package com.gymmate.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gymmate.entities.Diet;

public interface DietDao extends JpaRepository<Diet, Long> {

}
