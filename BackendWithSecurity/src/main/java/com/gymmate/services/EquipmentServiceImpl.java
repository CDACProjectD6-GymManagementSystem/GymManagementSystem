package com.gymmate.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.gymmate.customexception.ResourceNotFoundException;
import com.gymmate.daos.EquipmentDao;
import com.gymmate.dtos.ApiResponse;
import com.gymmate.dtos.EquipmentCategoryDTO;
import com.gymmate.dtos.EquipmentRequestDto;
import com.gymmate.dtos.EquipmentResp2Dto;
import com.gymmate.dtos.EquipmentRespDto;
import com.gymmate.entities.Equipment;
import com.gymmate.entities.Equipment.Category;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class EquipmentServiceImpl implements EquipmentService {
	private final EquipmentDao equipmentDao;
	private final ModelMapper mapper;
	
	
	
	@Override
	public ApiResponse addEquipment(EquipmentRequestDto addDto) {
		Equipment entity = mapper.map(addDto, Equipment.class);
		equipmentDao.save(entity);
		return new ApiResponse("Equipment Added Successfully");
	}
	
	
	@Override
	public List<EquipmentRespDto> getAllEquipments() {
		
		return equipmentDao.findAll()
				.stream()
				.map(equi->mapper.map(equi,EquipmentRespDto.class))
				.toList();
	}
	
	
	@Override
	public ApiResponse deleteEquipment(Long id) {
		Equipment entity = equipmentDao.findById(id)
							.orElseThrow(()->new ResourceNotFoundException("Equipment Not found"));
		equipmentDao.delete(entity);
		return new ApiResponse("Equipment Deleted Successfully");
	}
	
	
	@Override
	public ApiResponse updateEquipment(EquipmentRequestDto updateDto, Long id) {
		Equipment entity = equipmentDao.findById(id)
		.orElseThrow(()->new ResourceNotFoundException("Equipment Not found"));
		mapper.map(updateDto, entity);
		return new ApiResponse("Equipment Updated Successfully");
	}
	
	
	
	
	@Override
	public List<EquipmentCategoryDTO> getEquipmentCategories() {
	    List<EquipmentCategoryDTO> result = new ArrayList<>();

	    for (Equipment.Category category : Equipment.Category.values()) {
	        long active = equipmentDao.countByCategoryAndForMaintenance(category, false);
	        long maintenance = equipmentDao.countByCategoryAndForMaintenance(category, true);

	        result.add(new EquipmentCategoryDTO(category.name(), active, maintenance));
	    }

	    return result;
	}

	

	@Override
	public List<Equipment> getCardioEquipments() {
	    return equipmentDao.findByCategory(Equipment.Category.CARDIO);
	}


	@Override
	public List<Equipment> getStrengthEquipments() {
		// TODO Auto-generated method stub
		return equipmentDao.findByCategory(Equipment.Category.STRENGTH);
	}


	@Override
	public List<Equipment> getFlexibiltyEquipments() {
		// TODO Auto-generated method stub
		return equipmentDao.findByCategory(Equipment.Category.FLEXIBILITY);
	}


	@Override
	public List<Equipment> FreeWeightEquipments() {
		// TODO Auto-generated method stub
		return equipmentDao.findByCategory(Equipment.Category.FREE_WEIGHTS);
	}


	@Override
	public List<Equipment> getResistanceEquipments() {
		// TODO Auto-generated method stub
		return equipmentDao.findByCategory(Equipment.Category.RESISTANCE_MACHINES);
	}


	@Override
	public ApiResponse toggleMaintenance(Long id, Map<String, Boolean> body) {
	    Equipment equipment = equipmentDao.findById(id)
	        .orElseThrow(() -> new ResourceNotFoundException("Equipment not found"));

	    Boolean value = body.get("forMaintenance");
	    if (value != null) {
	        equipment.setForMaintenance(value);
	        equipmentDao.save(equipment);
	        return new ApiResponse("Updated maintenance status");
	    } else {
	        throw new IllegalArgumentException("Missing 'forMaintenance' key");
	    }
	}


	@Override
	public List<EquipmentResp2Dto> getMaintenanceEquipment() {
		
		return equipmentDao.findByForMaintenanceTrue().stream().map(e->mapper.map(e, EquipmentResp2Dto.class)).toList();
	}


}
