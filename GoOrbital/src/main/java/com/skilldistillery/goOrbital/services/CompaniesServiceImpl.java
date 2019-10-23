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
		List<Companies> company = repo.findAll();
		return company;
	}

	@Override
	public Companies findById(int id) {
		Optional<Companies> optP = repo.findById(id);
		Companies company = null;
		if (optP.isPresent()) {
			company = optP.get();
		}
		return company;
	}

	@Override
	public Companies create(Companies company) {
		return repo.saveAndFlush(company);
	}

	@Override
	public Companies update(Companies company, int id) {
		Companies provid = findById(id);

		if (provid != null) {
			provid.setName(company.getName());
			provid.setLogoUrl(company.getLogoUrl());
			provid.setWebUrl(company.getWebUrl());

		}
		return repo.saveAndFlush(provid);
	}

	@Override
	public boolean delete(int id) {
		Optional<Companies> company = repo.findById(id);
		if (company.isPresent()) {
			repo.deleteById(id);
		}
		return false;
	}

	@Override
	public Companies findByUid(int uid) {
		Companies company = repo.findByUser_Id(uid);
		return company;
	}

	@Override
	public Companies findByName(String name) {
		return repo.findByName(name);
	}

}
