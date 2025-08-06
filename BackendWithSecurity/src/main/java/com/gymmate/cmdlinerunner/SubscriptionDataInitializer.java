package com.gymmate.cmdlinerunner;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import com.gymmate.daos.SubscriptionDao;
import com.gymmate.entities.Subscription;
import com.gymmate.entities.Subscription.GymAccess;

@Component
public class SubscriptionDataInitializer {

	@Bean
	CommandLineRunner initSubscription(SubscriptionDao sdao) {
		return args -> {
			String name = "Standard";
			boolean subExists = sdao.existsByName(name);
			if (!subExists) {
				Subscription sub=new Subscription();
				sub.setName(name);
				sub.setAccess(GymAccess.OFF_PEAK_HOURS);
				sub.setActive(true);
				sub.setDescription("Limited Features");
				sub.setDietConsultation(false);
				sub.setDiscount(0);
				sub.setDuration(1);
				sub.setDurationInDays(30);
				sub.setSauna(false);
				sub.setPrice(500);
				sdao.save(sub);
				System.out.println("Default package created with "+name+" name");
			}
				
		};
	}
}
