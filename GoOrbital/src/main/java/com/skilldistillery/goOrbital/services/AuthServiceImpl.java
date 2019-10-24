package com.skilldistillery.goOrbital.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.skilldistillery.goOrbital.entities.User;
import com.skilldistillery.goOrbital.repositories.UserRepository;
@Service
public class AuthServiceImpl implements AuthService {
	
	@Autowired
	private UserRepository uRepo;
	
	@Autowired
	private PasswordEncoder encoder;

	@Override
	public User register(User user) {
		String encodedPW = encoder.encode(user.getPassword());
		user.setPassword(encodedPW); // only persist encoded password
		// set other fields to default values
		user.setEnabled(true);
//		user.setRole("standard");

		uRepo.saveAndFlush(user);
		return user;
	}
}
