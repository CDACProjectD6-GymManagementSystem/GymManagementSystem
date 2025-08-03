package com.gymmate.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.gymmate.entities.Payment;

public interface PaymentDAO extends JpaRepository<Payment, Long>{

	@Query(nativeQuery = true,value = "select sum(amount) from payments")
	int getTotalMoney();

}
