package com.gymmate.services;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gymmate.customexception.ResourceNotFoundException;
import com.gymmate.daos.EquipmentDao;
import com.gymmate.daos.PaymentDAO;
import com.gymmate.daos.ReceptionistDao;
import com.gymmate.daos.SubscriptionDao;
import com.gymmate.daos.TrainerDao;
import com.gymmate.daos.UserDao;
import com.gymmate.dtos.ApiResponse;
import com.gymmate.dtos.DashboardStatsDto;
import com.gymmate.dtos.UserEntityResponseDto;
import com.gymmate.dtos.UserSubscriptionAddDto;
import com.gymmate.dtos.UserSubscriptionUpdateDto;
import com.gymmate.entities.BaseEntity.UserRole;
import com.gymmate.entities.Payment;
import com.gymmate.entities.Subscription;
import com.gymmate.entities.UserEntity;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class AdminServiceImpl implements AdminService {

	private final EquipmentDao equipmentDao;
	private final TrainerDao trainerDao;
	private final ReceptionistDao receptionistDao;
	private final SubscriptionDao subscriptionDao;
	private final UserDao userDao;
	private final ModelMapper mapper;
	private final PaymentDAO pdao;
	 
	@Override
	public ApiResponse addUser(UserSubscriptionAddDto userAddDto) {
		if (!subscriptionDao.existsByName(userAddDto.getSubscriptionType())) {
			throw new ResourceNotFoundException("Subscription Type not found");
		}
		if (userDao.existsByEmail(userAddDto.getEmail())) {
			throw new RuntimeException("A user with this email already exists");
		}
		BCryptPasswordEncoder encode = new BCryptPasswordEncoder();

		UserEntity userEntity = mapper.map(userAddDto, UserEntity.class);
		Subscription subEntity = subscriptionDao.findByName(userAddDto.getSubscriptionType());
		
		userEntity.setSubscriptionId(subEntity);
		userEntity.setActive(true);
		userEntity.setRole(UserRole.ROLE_USER);
		userEntity.setSubscribed(true);
		userEntity.setPassword(encode.encode(userAddDto.getPassword()));
		Payment payment=new Payment();
		payment.setAmount(subEntity.getPrice());
		payment.setFirstName(userEntity.getFirstName());
		payment.setLastName(userEntity.getLastName());
		payment.setSubscriptionName(subEntity.getName());
		pdao.save(payment);
		userDao.save(userEntity);

		return new ApiResponse("User Created");
	}

	@Override
	public ApiResponse softDeleteUser(Long userId) {
		UserEntity userEntity = userDao.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User Not Found"));

		userEntity.setActive(false); // SoftDeleting the User
		return new ApiResponse("User Deleted Successfully");
	}

	@Override
	public ApiResponse updateUser(UserSubscriptionUpdateDto userUpdatedto, Long userId) {
		UserEntity userEntity = userDao.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User Not Found"));
		if (!userEntity.getSubscriptionId().getName().equals(userUpdatedto.getSubscriptionType())) {
			Subscription subEntity = subscriptionDao.findByName(userUpdatedto.getSubscriptionType());
			userEntity.setSubscriptionId(subEntity);
		}
		mapper.map(userUpdatedto, userEntity);
		return new ApiResponse("User Updated Successfully");
	}

	@Override
	public List<UserEntityResponseDto> getActiveUsers() {

		List<UserEntity> list = userDao.findByIsActiveTrue();
		List<UserEntityResponseDto> subtypelist = new ArrayList<>();

		Subscription stdSubscription = subscriptionDao.findByName("Standard");
		if (stdSubscription == null) {
			throw new ResourceNotFoundException("'Standard' subscription not found in the database!");
		}
		if (list != null && !list.isEmpty()) {
			for (UserEntity user : list) {
				UserEntityResponseDto u1 = new UserEntityResponseDto();
				mapper.map(user, u1);
				if (user.getSubscriptionId() != null) {
					u1.setSubscriptionType(user.getSubscriptionId().getName());
				} else {
					user.setSubscriptionId(stdSubscription);
					u1.setSubscriptionType(stdSubscription.getName());
					userDao.save(user);
				}
				subtypelist.add(u1);
			}

		}
		return subtypelist;
	}

	@Override
	public DashboardStatsDto getStats() {
		DashboardStatsDto respDto=new DashboardStatsDto();
		respDto.setActiveUsers(userDao.getActiveUsersCount());
		respDto.setTotalUsers(userDao.getAllUsersCount());
		respDto.setReceptionists(receptionistDao.getCount());
		respDto.setTrainers(trainerDao.getCount());
		respDto.setTotalEquipments(equipmentDao.getCount());
		respDto.setTotalPackages(subscriptionDao.getCount());
		respDto.setTotalMoneyReceived(pdao.getTotalMoney());
		
		return respDto;
	}
}
