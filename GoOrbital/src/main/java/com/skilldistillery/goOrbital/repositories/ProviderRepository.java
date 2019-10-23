package com.skilldistillery.goOrbital.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.goOrbital.entities.Companies;

public interface ProviderRepository extends JpaRepository<Companies, Integer> {
	
	Companies findByUser_Id(int uid);

	Companies findByName(String name);

}
