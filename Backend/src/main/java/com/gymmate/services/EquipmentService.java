package com.gymmate.services;

import java.util.List;

import com.gymmate.dtos.ApiResponse;
import com.gymmate.dtos.EquipmentCategoryDTO;
import com.gymmate.dtos.EquipmentRequestDto;
import com.gymmate.dtos.EquipmentRespDto;
import com.gymmate.entities.Equipment;
import com.gymmate.entities.Equipment.Category;

public interface EquipmentService {

	ApiResponse addEquipment(EquipmentRequestDto addDto);

	List<EquipmentRespDto> getAllEquipments();

	ApiResponse deleteEquipment(Long id);

	ApiResponse updateEquipment(EquipmentRequestDto updateDto, Long id);

	List<EquipmentCategoryDTO> getEquipmentCategories();

	List<Equipment> getCardioEquipments();

	List<Equipment> getStrengthEquipments();

	List<Equipment> getFlexibiltyEquipments();

	List<Equipment> FreeWeightEquipments();

	List<Equipment> getResistanceEquipments();


}
