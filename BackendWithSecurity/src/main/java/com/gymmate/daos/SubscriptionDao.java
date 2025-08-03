package com.gymmate.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.gymmate.entities.Subscription;

public interface SubscriptionDao extends JpaRepository<Subscription, Long> {

	boolean existsByName(String name);

	List<Subscription> findByIsActiveTrue();

	Subscription findByName(String subscriptionType);

	@Query(nativeQuery = true,value = "select count(*) from subscriptions where is_active=true")
	int getCount();

}
