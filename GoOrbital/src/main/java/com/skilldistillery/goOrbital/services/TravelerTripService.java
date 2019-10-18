package com.skilldistillery.goOrbital.services;

import java.util.List;

import com.skilldistillery.goOrbital.entities.TravelerTrip;

public interface TravelerTripService {
	List<TravelerTrip> index();

	TravelerTrip findById(int id);

	TravelerTrip create(TravelerTrip travelerTrip);

	TravelerTrip update(TravelerTrip travelerTrip, int id);

	boolean delete(int id);

}
