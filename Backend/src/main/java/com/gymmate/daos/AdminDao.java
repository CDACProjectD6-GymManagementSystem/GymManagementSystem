package com.gymmate.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gymmate.entities.Admin;

public interface AdminDao extends JpaRepository<Admin, Long> {

}
