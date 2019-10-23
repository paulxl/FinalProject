package com.skilldistillery.goOrbital.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.goOrbital.entities.Trip;


public interface TripRepository extends JpaRepository<Trip, Integer> {
	
	List<Trip> findByDestination(String dest);

	List<Trip> findByCompanies_Id(int id);

}
