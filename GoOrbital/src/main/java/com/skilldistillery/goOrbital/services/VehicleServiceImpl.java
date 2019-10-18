package com.skilldistillery.goOrbital.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.goOrbital.entities.Vehicle;
import com.skilldistillery.goOrbital.repositories.VehicleRepository;

@Service
public class VehicleServiceImpl implements VehicleService {

	@Autowired
	private VehicleRepository repo; 
	
	@Override
	public List<Vehicle> index() {
		List<Vehicle> vehicle = repo.findAll();
		return vehicle;
	}

	@Override
	public Vehicle findById(int id) {
		Optional<Vehicle> optV = repo.findById(id);
		Vehicle vehicle = null; 
		if (optV.isPresent()) {
			vehicle = optV.get();
		}
		return vehicle;
	}

	@Override
	public Vehicle create(Vehicle vehicle) {
		return repo.saveAndFlush(vehicle);
	}

	@Override
	public Vehicle update(Vehicle vehicle, int id) {
		Vehicle veh = findById(id);
		
		if (veh != null) {
			veh.setName(vehicle.getName());
			veh.setType(vehicle.getType());
			veh.setDescription(vehicle.getDescription());
			veh.setCapacity(vehicle.getCapacity());
			veh.setPhotoUrl(vehicle.getPhotoUrl());
			veh.setRange(vehicle.getRange());
		}
		return repo.saveAndFlush(veh);
	}

	@Override
	public boolean delete(int id) {
		Optional<Vehicle> vehicle = repo.findById(id);
		if (vehicle.isPresent()) {
			repo.deleteById(id);
		}
		return false;
	}

}
