package com.gymmate.entities;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

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
public class UserEntity extends BaseEntity implements UserDetails {
	private int age;
	private String goals;
	private double height;
	private double wieght;
	@Column(name = "conditions_allergies")
	private String conditionsOrAllergies;
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

	public String getUsername() {
		// TODO Auto-generated method stub
		return this.getEmail();
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {

		return List.of(new SimpleGrantedAuthority(this.getRole().name()));
	}
}
