package com.gymmate.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.gymmate.dtos.EquipmentResp2Dto;
import com.gymmate.entities.Equipment;
import com.gymmate.entities.Equipment.Category;

public interface EquipmentDao extends JpaRepository<Equipment, Long> {

	List<Equipment> findByForMaintenanceFalse();

	long countByCategoryAndForMaintenance(Category category, boolean b);
	
	List<Equipment> findByCategory(Equipment.Category category);

	@Query(nativeQuery = true,value = "select count(*) from equipments")
	int getCount();

	List<Equipment> findByForMaintenanceTrue();

}
