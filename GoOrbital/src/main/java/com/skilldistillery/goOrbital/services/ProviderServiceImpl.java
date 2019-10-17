package com.skilldistillery.goOrbital.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.skilldistillery.goOrbital.entities.Provider;
import com.skilldistillery.goOrbital.repositories.ProviderRepository;

public class ProviderServiceImpl implements ProviderService {

	@Autowired
	private ProviderRepository repo;

	@Override
	public List<Provider> index() {
		List<Provider> provider = repo.findAll();
		return provider;
	}

	@Override
	public Provider findById(int id) {
		Optional<Provider> optP = repo.findById(id);
		Provider provider = null;
		if (optP.isPresent()) {
			provider = optP.get();
		}
		return provider;
	}

	@Override
	public Provider create(Provider provider) {
		return repo.saveAndFlush(provider);
	}

	@Override
	public Provider update(Provider provider, int id) {
		Provider provid = findById(id);

		if (provid != null) {
			provid.setName(provid.getName());
			provid.setLogoUrl(provid.getLogoUrl());
			provid.setWebUrl(provid.getWebUrl());

		}
		return repo.saveAndFlush(provid);
	}

	@Override
	public boolean delete(int id) {
		Optional<Provider> provider = repo.findById(id);
		if (provider.isPresent()) {
			repo.deleteById(id);
		}
		return false;
	}

}
