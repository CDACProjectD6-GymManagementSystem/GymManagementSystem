package com.gymmate.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gymmate.entities.Equipment;

public interface EquipmentDao extends JpaRepository<Equipment, Long> {

	List<Equipment> findByForMaintenanceFalse();

}
