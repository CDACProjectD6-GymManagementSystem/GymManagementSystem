package com.gymmate.services;

import java.util.List;

import com.gymmate.dtos.ApiResponse;
import com.gymmate.dtos.EquipmentRequestDto;
import com.gymmate.dtos.EquipmentRespDto;

public interface EquipmentService {

	ApiResponse addEquipment(EquipmentRequestDto addDto);

	List<EquipmentRespDto> getAllEquipments();

	ApiResponse deleteEquipment(Long id);

	ApiResponse updateEquipment(EquipmentRequestDto updateDto, Long id);

}
