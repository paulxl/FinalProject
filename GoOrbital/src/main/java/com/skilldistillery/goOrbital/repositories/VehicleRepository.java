package com.skilldistillery.goOrbital.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.goOrbital.entities.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle, Integer> {

}
