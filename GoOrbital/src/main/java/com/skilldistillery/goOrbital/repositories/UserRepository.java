package com.skilldistillery.goOrbital.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.goOrbital.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	User findByUsername(String keyword);
}
