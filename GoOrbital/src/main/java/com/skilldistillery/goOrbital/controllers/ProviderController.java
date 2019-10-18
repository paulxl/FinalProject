package com.skilldistillery.goOrbital.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.goOrbital.entities.Provider;
import com.skilldistillery.goOrbital.services.ProviderService;

@RequestMapping("api")
@RestController
@CrossOrigin({"*", "http://localhost:4210"})
public class ProviderController {


	@Autowired
	private ProviderService svr;

	
	@GetMapping("ping")
	public String ping()
	{ return "pong/n";  }

	@GetMapping(path ="providers")
	public List<Provider> index() {
		return svr.index();
	}
	//"status": 500,
	// Failed :    "error": "Internal Server Error",
  //  "message": "Could not write JSON: (was java.lang.NullPointerException); nested exception is 
	

	
//	@RequestMapping(path = "/authenticate", method = RequestMethod.GET)
//	public Principal authenticate(Principal principal) {
//	    return principal;
//	}
	
	@GetMapping(path ="provider/{providerId}")
	public Provider show(@PathVariable Integer providerId, HttpServletResponse resp) {
		
		Provider provider;
		try {
			provider = svr.findById(providerId);
		} catch (Exception e) {
			resp.setStatus(400);
			provider = null;
			e.printStackTrace();
		}
		 
		return provider;
	}
	//  "status": 404,
    // "error": "Not Found",

	
//	@PostMapping(path ="posts")
//	public Life create(@RequestBody Life life, HttpServletResponse resp, HttpServletRequest req) {
//		try {
//			svr.create(life);
//			resp.setStatus(201);
//			StringBuffer url = req.getRequestURL();
//			url.append("/");
//			url.append(life.getId());
//			resp.setHeader("Location", url.toString());
//		} catch (Exception e) {
//			resp.setStatus(400);
//			life = null;
//			e.printStackTrace();
//		}
//		return life;
//	}
	
//
//	@PutMapping(path ="posts/{trackerId}")
//	public Life update(@PathVariable("trackerId") Integer trackerId, @RequestBody Life life, HttpServletResponse resp) {
//
//		try {
//			svr.update(trackerId, life);
//			if (life == null) 
//			{resp.setStatus(404);}
//		} catch (Exception e) {
//			resp.setStatus(400);
//			e.printStackTrace();
//			life = null;
//		}
//		return life;
//		
//	}
//
//	@DeleteMapping(path ="posts/{trackerId}")
//	public void delete(@PathVariable int trackerId, HttpServletRequest req, HttpServletResponse resp) {
//		try {
//			svr.delete(trackerId);
//		} catch (Exception e) {
//			e.printStackTrace();
//			resp.setStatus(404);
//		}
//	}
//	
	
	
}

