package com.skilldistillery.goOrbital.services;

import java.util.List;

import com.skilldistillery.goOrbital.entities.Launchport;
import com.skilldistillery.goOrbital.entities.Provider;

public interface LaunchportService {

	List<Launchport> index();
	
	Launchport findById(int id);
	
	Launchport create(Launchport lp);

	Launchport update(Launchport lp, int id);

	boolean delete(int id);

}
