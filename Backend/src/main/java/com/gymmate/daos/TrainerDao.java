package com.gymmate.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gymmate.entities.Trainer;

public interface TrainerDao extends JpaRepository<Trainer, Long> {



}
