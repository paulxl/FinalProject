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
import com.skilldistillery.goOrbital.services.CompaniesService;
import com.skilldistillery.goOrbital.services.TravelerService;

@RestController
@CrossOrigin({ "*", "http://localhost:4210" })
public class AuthController {
	@Autowired
	private AuthService authService;
	@Autowired
	private CompaniesService compService;
	@Autowired
	private TravelerService travService;

	@PostMapping("register/company")
	public User registerCompany(@RequestBody CreateCompanyDTO dto, HttpServletResponse resp) {
		User user = dto.makeUser();
		user.setRole("company");
		Companies company = dto.getCompany();
		if (user == null || company == null) {
			resp.setStatus(400);
			return null;
		} else {
			user = authService.register(user);
			company.setUser(user);
			company = compService.create(company);
		}
		return user;
	}

	@PostMapping("register/traveler")
	public User registerTraveler(@RequestBody CreateTravelerDTO dto, HttpServletResponse resp) {
		User user = dto.makeUser();
		user.setRole("traveler");
		System.err.println(user.getPassword());
		System.err.println("inside of register traveler method auth controller");
		Traveler traveler = dto.getTraveler();
		if (user == null || traveler == null) {
			resp.setStatus(400);
			return null;
		} else {
			user = authService.register(user);
			traveler.setUser(user);
			traveler = travService.create(traveler);
		}
		return user;
	}

	@RequestMapping(path = "register", method = RequestMethod.POST)
	public User register(@RequestBody User user, HttpServletResponse resp) {
		if (user == null) {
			resp.setStatus(400);
			return null;
		} else {
			user = authService.register(user);
		}

		return user;
	}

	@RequestMapping(path = "auth", method = RequestMethod.GET)
	public Principal authenticate(Principal principal) {
		return principal;
	}
}
