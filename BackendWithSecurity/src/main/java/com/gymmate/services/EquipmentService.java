package com.gymmate.services;

import java.util.List;
import java.util.Map;

import com.gymmate.dtos.ApiResponse;
import com.gymmate.dtos.EquipmentCategoryDTO;
import com.gymmate.dtos.EquipmentRequestDto;
import com.gymmate.dtos.EquipmentResp2Dto;
import com.gymmate.dtos.EquipmentRespDto;
import com.gymmate.entities.Equipment;

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

	ApiResponse toggleMaintenance(Long id, Map<String, Boolean> body);

	List<EquipmentResp2Dto> getMaintenanceEquipment();


}
