package com.skilldistillery.goOrbital.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.goOrbital.entities.Trip;


public interface TripRepository extends JpaRepository<Trip, Integer> {

}
