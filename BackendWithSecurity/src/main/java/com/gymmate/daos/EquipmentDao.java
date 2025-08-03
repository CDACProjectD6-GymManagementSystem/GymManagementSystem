package com.gymmate.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gymmate.entities.Equipment;
import com.gymmate.entities.Equipment.Category;

public interface EquipmentDao extends JpaRepository<Equipment, Long> {

	List<Equipment> findByForMaintenanceFalse();

	long countByCategoryAndForMaintenance(Category category, boolean b);
	
	List<Equipment> findByCategory(Equipment.Category category);

}
