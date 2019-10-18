package com.skilldistillery.goOrbital.services;

import java.util.List;

import com.skilldistillery.goOrbital.entities.Vehicle;

public interface VehicleService {

	List<Vehicle> index();
	
	Vehicle findById(int id);
	
	Vehicle create(Vehicle vehicle);

	Vehicle update(Vehicle vehicle, int id);

	boolean delete(int id);
}
