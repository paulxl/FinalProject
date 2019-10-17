package com.skilldistillery.goOrbital.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.skilldistillery.goOrbital.entities.Trip;
import com.skilldistillery.goOrbital.repositories.TripRepository;

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
			tr.setTitle(tr.getTitle());
			tr.setDestination(tr.getDestination());
			tr.setCost(tr.getCost());
			tr.setLength(tr.getLength());
			tr.setDate(tr.getDate());
			tr.setPhotoUrl(tr.getPhotoUrl());
		}
		return repo.saveAndFlush(tr);
	}

	@Override
	public boolean delete(int id) {
		Optional<Trip> trip = repo.findById(id);
		if (trip.isPresent()) {
			repo.deleteById(id);
		}
		return false;
	}

}
