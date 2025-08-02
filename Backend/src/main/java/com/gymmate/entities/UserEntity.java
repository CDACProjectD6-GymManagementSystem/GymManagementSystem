package com.gymmate.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "users")
@ToString(callSuper = true)
public class UserEntity extends BaseEntity {
	@Column(name = "is_subscribed")
	private boolean isSubscribed;
	@Column(name = "is_active")
	private boolean isActive;
	@ManyToOne
	private Trainer trainer;
	@ManyToOne
	private Subscription subscriptionId;
	@OneToOne
	private Diet diet;
	@OneToOne
	private Schedule schedule;
	private LocalDateTime subscriptionStartDate;
    private LocalDateTime subscriptionEndDate;
	@Column(name = "image_url")
	private String imageUrl;

	@Column(name = "image_public_id")
	private String imagePublicId;

	
	public UserEntity(boolean isSubscribed, boolean isActive) {
		super();
		this.isSubscribed = isSubscribed;
		this.isActive = isActive;
	}
	
	public void addDiet(Diet diet) {
		this.setDiet(diet);
	}
	
}
