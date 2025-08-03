package com.gymmate.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gymmate.entities.Payment;

public interface PaymentDAO extends JpaRepository<Payment, Long>{

}
