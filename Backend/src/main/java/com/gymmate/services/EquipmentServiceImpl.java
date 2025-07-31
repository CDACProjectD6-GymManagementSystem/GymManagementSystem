package com.gymmate.services;

import java.util.Arrays;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gymmate.customexception.ResourceNotFoundException;
import com.gymmate.daos.EquipmentDao;
import com.gymmate.dtos.ApiResponse;
import com.gymmate.dtos.EquipmentRequestDto;
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
		
		return equipmentDao.findByForMaintenanceFalse()
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
	public List<Category> getEquipmentCategories() {
		// TODO Auto-generated method stub
		return Arrays.asList(Category.values());
	}

}
