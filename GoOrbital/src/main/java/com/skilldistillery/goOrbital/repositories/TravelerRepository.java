package com.skilldistillery.goOrbital.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.goOrbital.entities.Traveler;

public interface TravelerRepository extends JpaRepository<Traveler, Integer> {
	
	Traveler findByUser_Id(int uid);

}
