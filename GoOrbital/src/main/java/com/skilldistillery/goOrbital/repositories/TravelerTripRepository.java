package com.skilldistillery.goOrbital.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.goOrbital.entities.TravelerTrip;

public interface TravelerTripRepository extends JpaRepository<TravelerTrip, Integer> {

	List <TravelerTrip> findByTripId(int id);

	List <TravelerTrip> findByTravelerId(int id);

}
