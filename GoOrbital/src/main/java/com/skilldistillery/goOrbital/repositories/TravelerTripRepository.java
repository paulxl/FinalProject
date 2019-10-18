package com.skilldistillery.goOrbital.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.goOrbital.entities.TravelerTrip;

public interface TravelerTripRepository extends JpaRepository<TravelerTrip, Integer> {

<<<<<<< HEAD
=======
	

>>>>>>> f15c06f28b14c913a0222ef63ef8b029dd0e6b57
	List <TravelerTrip> findByTripId(int id);

	List <TravelerTrip> findByTravelerId(int id);

}
