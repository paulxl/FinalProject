package com.skilldistillery.goOrbital.services;

import java.util.List;


import com.skilldistillery.goOrbital.entities.Trip;


public interface TripService {
	
	List<Trip> index();
	
	Trip findById(int id);
	
	Trip create(Trip trip);

	Trip update(Trip trip, int id);

	boolean delete(int id);

	List<Trip> findByDestination(String dest);

	List<Trip> findByCId(int cid);
}
