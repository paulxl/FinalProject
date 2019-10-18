package com.skilldistillery.goOrbital.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.skilldistillery.goOrbital.entities.Trip;


public interface TripService {
	
	List<Trip> index();
	
	Trip findById(int id);
	
	Trip create(Trip trip);

	Trip update(Trip trip, int id);

	boolean delete(int id);
}
