package com.gymmate.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gymmate.entities.Schedule;

public interface ScheduleDao extends JpaRepository<Schedule, Long> {

}
