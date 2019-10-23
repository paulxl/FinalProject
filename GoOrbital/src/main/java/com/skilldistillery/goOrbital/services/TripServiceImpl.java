package com.skilldistillery.goOrbital.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.goOrbital.entities.Trip;
import com.skilldistillery.goOrbital.repositories.TripRepository;

@Service
public class TripServiceImpl implements TripService {

	@Autowired
	private TripRepository repo;

	@Override
	public List<Trip> index() {
		List<Trip> trip = repo.findAll();
		return trip;
	}

	@Override
	public Trip findById(int id) {
		Optional<Trip> optT = repo.findById(id);
		Trip trip = null;
		if (optT.isPresent()) {
			trip = optT.get();
		}
		return trip;
	}

	@Override
	public Trip create(Trip trip) {
		return repo.saveAndFlush(trip);
	}

	@Override
	public Trip update(Trip trip, int id) {
		Trip tr = findById(id);

		if (tr != null) {
			tr.setVehicle(trip.getVehicle());
			tr.setLaunchport(trip.getLaunchport());
			tr.setTitle(trip.getTitle());
			tr.setDestination(trip.getDestination());
			tr.setCost(trip.getCost());
			tr.setLength(trip.getLength());		
			tr.setDate(trip.getDate());
			tr.setPhotoUrl(trip.getPhotoUrl());
		}
		return repo.saveAndFlush(tr);
	}

	@Override
	public boolean delete(int id) {
		try {
			if (repo.existsById(id)) {
				repo.deleteById(id);
				return true;
			} else {
				return false;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public List<Trip> findByDestination(String dest) {
		return repo.findByDestination(dest);
	}

}
