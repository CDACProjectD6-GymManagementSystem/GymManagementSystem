package com.gymmate.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gymmate.entities.Subscription;

public interface SubscriptionDao extends JpaRepository<Subscription, Long> {

	boolean existsByName(String name);

	List<Subscription> findByIsActiveTrue();

	Subscription findByName(String subscriptionType);

}
