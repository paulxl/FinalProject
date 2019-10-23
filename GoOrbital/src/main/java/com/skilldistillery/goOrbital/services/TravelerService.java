package com.skilldistillery.goOrbital.services;

import java.util.List;

import com.skilldistillery.goOrbital.entities.Traveler;

public interface TravelerService {
	List<Traveler> index();

	Traveler findById(int id);

	Traveler create(Traveler traveler);

	Traveler update(Traveler traveler, int id);

	boolean delete(int id);
	
	Traveler findByUid(int id);

}
