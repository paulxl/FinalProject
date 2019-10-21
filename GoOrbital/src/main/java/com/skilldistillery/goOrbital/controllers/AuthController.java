package com.skilldistillery.goOrbital.controllers;

import java.security.Principal;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.goOrbital.entities.Companies;
import com.skilldistillery.goOrbital.entities.CreateCompanyDTO;
import com.skilldistillery.goOrbital.entities.CreateTravelerDTO;
import com.skilldistillery.goOrbital.entities.Traveler;
import com.skilldistillery.goOrbital.entities.User;
import com.skilldistillery.goOrbital.services.AuthService;

@RestController
@CrossOrigin({ "*", "http://localhost:4210" })
public class AuthController {
	@Autowired
	private AuthService authService;
	
//	@PostMapping("/register/company")
//	public Companies registerCompany(CreateCompanyDTO dto,HttpServletResponse resp) {
//		User user = new User(dto.getPassword(), dto.getUsername(), dto.getEmail());
//	        resp.setStatus(400);
//	    	user = authService.register(user);
//	    	
//		return null;
//	}
//	
//	@PostMapping("/register/traveler")
//	public Traveler registerTraveler(CreateTravelerDTO dto, HttpServletResponse resp) {
//		User user = new User(dto.getPassword(), dto.getUsername(), dto.getEmail());
//	        resp.setStatus(400);
//	    	user = authService.register(user);	    	
//		return null;
//	}
	
	@RequestMapping(path = "/register", method = RequestMethod.POST)
	public User register(@RequestBody User user, HttpServletResponse resp) {
	    if (user == null) {
	        resp.setStatus(400);
	        return null;
	    }else {
	    	user = authService.register(user);	    	
	    }


	    return user;
	}

	@RequestMapping(path = "/authenticate", method = RequestMethod.GET)
	public Principal authenticate(Principal principal) {
	    return principal;
	}
}
