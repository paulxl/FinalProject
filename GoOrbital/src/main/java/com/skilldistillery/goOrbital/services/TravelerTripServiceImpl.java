package com.skilldistillery.goOrbital.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.goOrbital.entities.TravelerTrip;
import com.skilldistillery.goOrbital.repositories.TravelerTripRepository;

@Service
public class TravelerTripServiceImpl implements TravelerTripService {

	@Autowired
	public TravelerTripRepository repo;
	
	

	@Override
	public List<TravelerTrip> index() {
		List<TravelerTrip> traveler = repo.findAll();
		return traveler;
	}

	@Override
	public TravelerTrip findById(int id) {
		Optional<TravelerTrip> optT = repo.findById(id);
		TravelerTrip ttr = null;
		if (optT.isPresent()) {
			ttr = optT.get();
		}
		return ttr;
	}

	@Override
	public TravelerTrip create(TravelerTrip ttr) {
		return repo.saveAndFlush(ttr);
	}

	@Override
	public TravelerTrip update(TravelerTrip ttr, int id) {
		TravelerTrip trav = findById(id);

		if (trav != null) {
			trav.setDateCompleted(ttr.getDateCompleted());
			trav.setRating(ttr.getRating());
			trav.setReview(ttr.getReview());
			trav.setTripNote(ttr.getTripNote());
		}
		return repo.saveAndFlush(trav);
	}

	@Override
	public boolean delete(int id) {
		Optional<TravelerTrip> ttr = repo.findById(id);
		if (ttr.isPresent()) {
			repo.deleteById(id);
		}
		return false;
	}

	@Override
	public List<TravelerTrip> findByTripId(int id) {
		List<TravelerTrip> ttt = repo.findByTripId(id);
		
		return ttt;
	}

	@Override
	public List<TravelerTrip> findByTravelerId(int id) {
		List<TravelerTrip> ttT= repo.findByTravelerId(id);
		
		return ttT;
	}
	

}
