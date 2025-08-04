package com.gymmate.services;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.gymmate.customexception.NonUniqueElementException;
import com.gymmate.customexception.ResourceNotFoundException;
import com.gymmate.daos.AdminDao;
import com.gymmate.daos.PaymentDAO;
import com.gymmate.daos.ReceptionistDao;
import com.gymmate.daos.TrainerDao;
import com.gymmate.daos.UserDao;
import com.gymmate.daos.SubscriptionDao;
import com.gymmate.dtos.ApiResponse;
import com.gymmate.dtos.ReceptionistRequestDto;
import com.gymmate.dtos.ReceptionistRespDto;
import com.gymmate.dtos.ReceptionistUpdateDto;
import com.gymmate.dtos.TrainerAssignmentDTO;
import com.gymmate.dtos.TrainerNameForReceptionistDTO;
import com.gymmate.dtos.UserEntityResponseDto;
import com.gymmate.dtos.UserNameForReceptonistDTO;
import com.gymmate.dtos.UserSubscriptionAddDto;
import com.gymmate.dtos.UserSubscriptionUpdateDto;
import com.gymmate.dtos.UserTrainerNameDTO;
import com.gymmate.entities.Payment;
import com.gymmate.entities.Receptionist;
import com.gymmate.entities.Subscription;
import com.gymmate.entities.Trainer;
import com.gymmate.entities.UserEntity;
import com.gymmate.entities.BaseEntity.UserRole;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ReceptionistServiceImpl implements ReceptionistService {

	private final AdminDao adminDao;
	@Autowired
	private UserDao userDao;
	@Autowired
	private TrainerDao trainerDao;
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private ReceptionistDao receptionistDao;
	@Autowired
	private SubscriptionDao subscriptionDao;
	@Autowired
	private PaymentDAO pdao; 

	UserTrainerNameDTO userTrainerNameDTO = new UserTrainerNameDTO();

	ReceptionistServiceImpl(AdminDao adminDao) {
		this.adminDao = adminDao;
	}

	public UserTrainerNameDTO getTrainers() {

		List<UserEntity> ulist = userDao.findAll();
		List<Trainer> tlist = trainerDao.findAll();
		List<UserNameForReceptonistDTO> userName = ulist.stream()
				.map(u -> new UserNameForReceptonistDTO(u.getFirstName(), u.getId())).collect(Collectors.toList());
		List<TrainerNameForReceptionistDTO> trainerName = tlist.stream()
				.map(t -> new TrainerNameForReceptionistDTO(t.getFirstName(), t.getId())).collect(Collectors.toList());
		userTrainerNameDTO.setTrainerNameList(trainerName);
		userTrainerNameDTO.setUserNameList(userName);
		return userTrainerNameDTO;
	}

	@Override
	public ApiResponse setTrainer(TrainerAssignmentDTO trainerAssignmentDTO) {
		UserEntity userEnt = userDao.findById(trainerAssignmentDTO.getUserId())
				.orElseThrow(() -> new ResourceNotFoundException("User Not Found"));
		Trainer trainerEnt = trainerDao.findById(trainerAssignmentDTO.getTrainerId())
				.orElseThrow(() -> new ResourceNotFoundException("Trainer Not Found"));
		userEnt.setTrainer(trainerEnt);
		userDao.save(userEnt);
		return new ApiResponse("Trainer Assigned Successfully");
	}

	@Override
	public ApiResponse addReceptionist(ReceptionistRequestDto addDto) {
		BCryptPasswordEncoder encode = new BCryptPasswordEncoder();

		if (receptionistDao.existsByEmail(addDto.getEmail()))
			throw new NonUniqueElementException("Email already Exist");
		Receptionist entity = mapper.map(addDto, Receptionist.class);
		entity.setPassword(encode.encode(addDto.getPassword()));
		entity.setRole(UserRole.ROLE_RECEPTIONIST);

		receptionistDao.save(entity);

		return new ApiResponse("Receptionist added successfully");
	}

	@Override
	public List<ReceptionistRespDto> getAllReceptionist() {

		return receptionistDao.findAll().stream().map(en -> mapper.map(en, ReceptionistRespDto.class)).toList();
	}

	@Override
	public ApiResponse deleteReceptionist(Long id) {
		Receptionist entity = receptionistDao.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Receptionist Not found"));
		receptionistDao.delete(entity);
		return new ApiResponse("Receptionist Deleted");
	}

	@Override
	public ApiResponse updateReceptionist(ReceptionistUpdateDto updatedto, Long id) {
		Receptionist entity = receptionistDao.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Receptionist Not found"));
		mapper.map(updatedto, entity);
		return new ApiResponse("Receptionist Updated Successfully");
	}
	
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


}
