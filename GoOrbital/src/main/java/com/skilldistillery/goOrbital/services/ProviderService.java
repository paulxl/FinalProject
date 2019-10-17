package com.skilldistillery.goOrbital.services;

import java.util.List;

import com.skilldistillery.goOrbital.entities.Provider;

public interface ProviderService {
	List<Provider> index();
	
	Provider findById(int id);
	
	Provider create(Provider provider);

	Provider update(Provider provider, int id);

	boolean delete(int id);

}
