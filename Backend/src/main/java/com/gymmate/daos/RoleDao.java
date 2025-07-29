package com.gymmate.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gymmate.entities.Role;

public interface RoleDao extends JpaRepository<Role, Long> {

}
