package com.skilldistillery.goOrbital.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.skilldistillery.goOrbital.entities.User;
import com.skilldistillery.goOrbital.repositories.UserRepository;

public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository repo; 

	@Override
	public List<User> index() {
		List<User> user = repo.findAll();
		return user;
	}

	@Override
	public User findById(int id) {
		Optional<User> optU = repo.findById(id);
		User user = null;
		if (optU.isPresent()) {
			user = optU.get();
		}
		return user;
	}

	@Override
	public User create(User user) {
		return repo.saveAndFlush(user);
	}

	@Override
	public User update(User user, int id) {
		User us = findById(id);
		
		if (us != null) {
			us.setPassword(user.getPassword());
			us.setUsername(user.getUsername());
			us.setEmail(user.getEmail());
			us.setEnabled(user.isEnabled());
			us.setRole(user.getRole());
		}
		return repo.saveAndFlush(us);
	}

	@Override
	public boolean delete(int id) {
		Optional<User> user = repo.findById(id);
		if (user.isPresent()) {
			repo.deleteById(id);
		}
		return false;
	}

}
