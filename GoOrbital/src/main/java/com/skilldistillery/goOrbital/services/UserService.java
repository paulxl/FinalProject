package com.skilldistillery.goOrbital.services;

import java.util.List;

import com.skilldistillery.goOrbital.entities.User;

public interface UserService {
	List<User> index();
	
	User findById(int id);
	
	User create(User user);

	User update(User user, int id);

	boolean delete(int id);
	
	User findByUsername(String username);
}
