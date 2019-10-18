package com.skilldistillery.goOrbital.services;

import java.util.List;

import com.skilldistillery.goOrbital.entities.TravelerTrip;

public interface TravelerTripService {
	
	//-------------READ--------------
	List<TravelerTrip> index();

	TravelerTrip findById(int id);

	List <TravelerTrip> findByTripId(int id);
	
	List <TravelerTrip> findByTravelerId(int id);
	
	//----------------CREATE---------------------

	TravelerTrip create(TravelerTrip travelerTrip);
	
	//---------------UPDATE--------------------

	TravelerTrip update(TravelerTrip travelerTrip, int id);

	
	//-----------DELETE--------------
	boolean delete(int id);

}
