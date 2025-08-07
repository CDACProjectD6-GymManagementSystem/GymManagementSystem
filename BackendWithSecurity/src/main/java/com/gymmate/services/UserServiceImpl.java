package com.gymmate.services;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.gymmate.customexception.ResourceNotFoundException;
import com.gymmate.daos.PaymentDAO;
import com.gymmate.daos.SubscriptionDao;
import com.gymmate.daos.UserDao;
import com.gymmate.dtos.ApiResponse;
import com.gymmate.dtos.AssignedTrainerTDTO;
import com.gymmate.dtos.SubscriptionResponseForUserDTO;
import com.gymmate.dtos.UserDietRespDTO;
import com.gymmate.dtos.UserDisplayProfileDto;
import com.gymmate.dtos.UserLoginDTO;
import com.gymmate.dtos.UserLoginResponseDTO;
import com.gymmate.dtos.UserPaymentRequestDTO;
import com.gymmate.dtos.UserRegistrationDTO;
import com.gymmate.dtos.UserScheduleRespDTO;
import com.gymmate.entities.Diet;
import com.gymmate.entities.Payment;
import com.gymmate.entities.Schedule;
import com.gymmate.entities.Subscription;
import com.gymmate.entities.UserEntity;
import com.gymmate.entities.BaseEntity.UserRole;

import jakarta.transaction.Transactional;

@Transactional
@Service

public class UserServiceImpl implements UserService {
	@Autowired
	private UserDao userDao;
	@Autowired
	private ModelMapper map;

	@Autowired
	private SubscriptionDao subscriptionDao;
	@Autowired
	private PaymentDAO paymentDAO;
	@Autowired
	private ImageService imageService;

	@Override
	public UserDisplayProfileDto getProfile(Long id) {
		Optional<UserEntity> userProfile = userDao.findById(id);
		UserDisplayProfileDto userDto = map.map(userProfile, UserDisplayProfileDto.class);
		return userDto;
	}

	@Override
	public boolean addProfile(UserDisplayProfileDto user) {
		UserEntity userEnt = map.map(user, UserEntity.class);

		userDao.save(userEnt);
		return true;
	}

	@Override
	public boolean updateProfile(Long id, UserDisplayProfileDto user) {
		UserEntity userEnt = userDao.findById(id).orElseThrow(() -> new ResourceAccessException("User is not present"));
		userEnt.setAddress(user.getAddress());
		userEnt.setEmail(user.getEmail());
		userEnt.setFirstName(user.getFirstName());
		userEnt.setLastName(user.getLastName());
		userEnt.setGender(user.getGender());
		userEnt.setMobile(user.getMobile());
		userEnt.setAge(user.getAge());
		userEnt.setConditionsOrAllergies(user.getConditionsOrAllergies());
		userEnt.setWieght(user.getWieght());
		userEnt.setHeight(user.getHeight());
		userEnt.setGoals(user.getGoals());
		return true;
	}

	@Override
	public ApiResponse registerUser(UserRegistrationDTO userRegistrationDTO) {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		UserEntity existingUser = userDao.findByEmail(userRegistrationDTO.getEmail());
		String encryptedPass = encoder.encode(userRegistrationDTO.getPassword());
		if (existingUser != null) {
			return new ApiResponse("Email is already registered!");
		} else {
			UserEntity userBeforeActive = map.map(userRegistrationDTO, UserEntity.class);
			userBeforeActive.setPassword(encryptedPass);
			userBeforeActive.setActive(true);
			userBeforeActive.setRole(UserRole.ROLE_USER);

			userDao.save(userBeforeActive);

			return new ApiResponse("user added successfully");
		}
	}

	@Override
	public UserLoginResponseDTO userLogin(UserLoginDTO userLoginDTO) {
		UserEntity userEnt = userDao.findByEmailAndPassword(userLoginDTO.getEmail(), userLoginDTO.getPassword());
		if (userEnt == null)
			return null;

		UserLoginResponseDTO user = new UserLoginResponseDTO();
		user.setId(userEnt.getId());
		user.setFirstName(userEnt.getFirstName());
		user.setEmail(userEnt.getEmail());
		user.setSubscribed(userEnt.isSubscribed());
		return user;
	}

	@Override
	public List<SubscriptionResponseForUserDTO> getAvailableSubscriptions() {
		List<Subscription> subList = subscriptionDao.findAll();
		List<SubscriptionResponseForUserDTO> dietDTO = subList.stream()
				.map(u -> map.map(u, SubscriptionResponseForUserDTO.class)).collect(Collectors.toList());
		return dietDTO;
	}

	@Override
	public UserDietRespDTO getUserDiet(Long id) {
		UserEntity userEnt = userDao.findById(id).orElseThrow(() -> new ResourceNotFoundException("user not found"));
		Diet diet = userEnt.getDiet();
		if (diet == null) {
			diet = new Diet();
		}
		return map.map(diet, UserDietRespDTO.class);
	}

	@Override
	public UserScheduleRespDTO getUserSchedule(Long id) {
		UserEntity userEnt = userDao.findById(id).orElseThrow(() -> new ResourceNotFoundException("user not found"));
		Schedule schedule = userEnt.getSchedule();
		if (schedule == null) {
			schedule = new Schedule();

		}
		return map.map(schedule, UserScheduleRespDTO.class);
	}

	@Override
	public ApiResponse buySubscription(UserPaymentRequestDTO paymentDTO, Long userId) {
		// 1. Fetch subscription/package
		Subscription sub = subscriptionDao.findByName(paymentDTO.getName());
		if (sub == null) {
			throw new ResourceNotFoundException("Subscription package not found");
		}

		// 2. Fetch user
		UserEntity userEnt = userDao.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User not found"));

		LocalDateTime now = LocalDateTime.now();

		// 3. Check if user has active subscription
		if (Boolean.TRUE.equals(userEnt.isSubscribed()) && userEnt.getSubscriptionEndDate() != null) {
			if (userEnt.getSubscriptionEndDate().isAfter(now)) {
				long daysRemaining = getDaysRemaining(userEnt.getSubscriptionEndDate(), now);
				throw new ResponseStatusException(HttpStatus.CONFLICT, // 409
						"You already have an active subscription. It expires on " + userEnt.getSubscriptionEndDate()
								+ ". Days remaining: " + daysRemaining);
			}
		}

		// 4. Set new subscription info
		userEnt.setSubscriptionId(sub); // or setSubscription(sub)
		userEnt.setSubscribed(true);
		userEnt.setSubscriptionStartDate(now);

		LocalDateTime endDate = now.plusDays(sub.getDurationInDays());
		userEnt.setSubscriptionEndDate(endDate);

		// 5. Optionally, calculate days remaining for response
		long daysRemaining = getDaysRemaining(endDate, now);

		// 6. Save payment record
		Payment userPay = new Payment();
		userPay.setAmount(sub.getPrice());
		userPay.setFirstName(userEnt.getFirstName());
		userPay.setLastName(userEnt.getLastName());
		userPay.setSubscriptionName(sub.getName());

		paymentDAO.save(userPay);
		userDao.save(userEnt);

		// 7. Craft custom success response
		String msg = "Payment successful! Subscription active till " + endDate + " (Days remaining: " + daysRemaining
				+ ")";
		return new ApiResponse(msg);

	}

	public long getDaysRemaining(LocalDateTime endDate, LocalDateTime asOf) {
		return ChronoUnit.DAYS.between(asOf.toLocalDate(), endDate.toLocalDate());
	}

	@Override
	public Map<String, String> uploadPhoto(Long id, MultipartFile file) throws IOException {
		UserEntity user = userDao.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
		if (user.getImagePublicId() != null && !user.getImagePublicId().isBlank()) {
			imageService.delete(user.getImagePublicId());
		}
		Map result = imageService.upload(file);

		String url = (String) result.get("secure_url");
		String publicId = (String) result.get("public_id");

		user.setImageUrl(url);
		user.setImagePublicId(publicId);
		userDao.save(user);

		Map<String, String> response = new HashMap<>();
		response.put("secure_url", url);
		response.put("public_id", publicId);
		return response;
	}

	@Override
	public ApiResponse deletePhoto(Long id) throws IOException {
		UserEntity user = userDao.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
		if (user.getImagePublicId() != null && !user.getImagePublicId().isBlank()) {
			imageService.delete(user.getImagePublicId());
			user.setImageUrl(null);
			user.setImagePublicId(null);
			userDao.save(user);
			return new ApiResponse("Image deleted successfully");
		}
		return new ApiResponse("No image found to delete");
	}

	@Override
	public AssignedTrainerTDTO getTrainer(Long id) {
		UserEntity userEnt = userDao.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
		if (userEnt.getTrainer() != null) {
			AssignedTrainerTDTO dto = new AssignedTrainerTDTO();
			dto.setTrainerId(userEnt.getTrainer().getId());
			dto.setTrainerName(userEnt.getTrainer().getFirstName());
			return dto;
		}
		throw new ResourceNotFoundException("no Trainer Assigned Yet!!!!");
	}
}
