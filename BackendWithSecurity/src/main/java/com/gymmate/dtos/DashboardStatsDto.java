package com.gymmate.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DashboardStatsDto {
	
	private int activeUsers;
	private int totalUsers;
	private int trainers;
	private int receptionists;
	private int totalMoneyReceived;
	private int totalPackages;
	private int totalEquipments;
}
