package com.skilldistillery.goOrbital.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.goOrbital.entities.Companies;
import com.skilldistillery.goOrbital.repositories.ProviderRepository;

@Service
public class CompaniesServiceImpl implements CompaniesService {

	@Autowired
	private ProviderRepository repo;

	@Override
	public List<Companies> index() {
		List<Companies> provider = repo.findAll();
		return provider;
	}

	@Override
	public Companies findById(int id) {
		Optional<Companies> optP = repo.findById(id);
		Companies provider = null;
		if (optP.isPresent()) {
			provider = optP.get();
		}
		return provider;
	}

	@Override
	public Companies create(Companies provider) {
		return repo.saveAndFlush(provider);
	}

	@Override
	public Companies update(Companies provider, int id) {
		Companies provid = findById(id);

		if (provid != null) {
			provid.setName(provider.getName());
			provid.setLogoUrl(provider.getLogoUrl());
			provid.setWebUrl(provider.getWebUrl());

		}
		return repo.saveAndFlush(provid);
	}

	@Override
	public boolean delete(int id) {
		Optional<Companies> provider = repo.findById(id);
		if (provider.isPresent()) {
			repo.deleteById(id);
		}
		return false;
	}

}
