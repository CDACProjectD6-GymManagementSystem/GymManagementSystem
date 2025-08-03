package com.gymmate.entities;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.databind.deser.Deserializers.Base;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "trainers")
@ToString(exclude = "userList",callSuper = true)
public class Trainer extends BaseEntity implements UserDetails {
	private double salary;
	@Column(length = 400, nullable = false)
	private String certifications;
	private String expertise;
	@OneToMany(mappedBy = "trainer", orphanRemoval = true, cascade = CascadeType.ALL)
	List<UserEntity> userList = new ArrayList<>();

	public void addUser(UserEntity u) {
		userList.add(u);
		u.setTrainer(this);
	}

	public void removeUser(UserEntity u) {
		userList.remove(u);
		u.setTrainer(null);
	}
	
	@Column(name = "image_url")
	private String imageUrl;

	@Column(name = "image_public_id")
	private String imagePublicId;

	

	public Trainer(double salary, String certifications, String expertise) {
		super();
		this.salary = salary;
		this.certifications = certifications;
		this.expertise = expertise;
	}
	public String getUsername() {
		// TODO Auto-generated method stub
		return this.getEmail();
	}@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		
		return List.of(new SimpleGrantedAuthority(this.getRole().name()));
	}
}
