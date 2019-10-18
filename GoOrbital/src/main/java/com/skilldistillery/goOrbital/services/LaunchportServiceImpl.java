package com.skilldistillery.goOrbital.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.goOrbital.entities.Launchport;
import com.skilldistillery.goOrbital.entities.Provider;
import com.skilldistillery.goOrbital.repositories.LaunchportRepository;

@Service
public class LaunchportServiceImpl implements LaunchportService{
	
	@Autowired
	private LaunchportRepository repo;

	@Override
	public List<Launchport> index() {
		List<Launchport> lports = repo.findAll();
		return lports;
	}

	@Override
	public Launchport findById(int id) {
		Optional<Launchport> lport1 = repo.findById(id);
		Launchport lport = null;
		if (lport1.isPresent()) {
			lport = lport1.get();
		}
		return lport;
	}

	@Override
	public Launchport create(Launchport lp) {
		return repo.saveAndFlush(lp);
		
	}

	@Override
	public Launchport update(Launchport launchport, int id) {
		Launchport lp = findById(id);

		if (lp != null) {
			lp.setName(launchport.getName());
			lp.setLatitude(launchport.getLatitude());
			lp.setLongitude(launchport.getLongitude());

		}
		return repo.saveAndFlush(lp);
	}

	@Override
	public boolean delete(int id) {
		Optional<Launchport> lp = repo.findById(id);
		if (lp.isPresent()) {
			repo.deleteById(id);
		}
		return false;
	}

}
