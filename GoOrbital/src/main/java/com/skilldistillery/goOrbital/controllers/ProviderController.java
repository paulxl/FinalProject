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

	
	//works	
	@GetMapping(path ="providers")
	public List<Provider> index() {
		return svr.index();
	}


	
//	@RequestMapping(path = "/authenticate", method = RequestMethod.GET)
//	public Principal authenticate(Principal principal) {
//	    return principal;
//	}
	
	@GetMapping(path ="provider/{pid}")
	public Provider getById(@PathVariable("pid") Integer pid, HttpServletResponse resp) {
		Provider provider;
		
		try {
			provider = svr.findById(pid);
			if (provider != null) {
				resp.setStatus(200);
			}else {
				resp.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(400);
			return null;
		}
		return provider;
		
	}


	
	@PostMapping(path ="provider")
	public Provider create(@RequestBody Provider provider, HttpServletResponse resp, HttpServletRequest req) {
		try {
			svr.create(provider);
			resp.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/");
			url.append(provider.getId());
			resp.setHeader("Location", url.toString());
		} catch (Exception e) {
			resp.setStatus(400);
			provider = null;
			e.printStackTrace();
		}
		return provider;
	}
	
//
//	@PutMapping(path ="posts/{trackerId}")
//	public Provider update(@PathVariable("trackerId") Integer trackerId, @RequestBody Provider provider, HttpServletResponse resp) {
//
//		try {
//			svr.update(trackerId, provider);
//			if (provider == null) 
//			{resp.setStatus(404);}
//		} catch (Exception e) {
//			resp.setStatus(400);
//			e.printStackTrace();
//			provider = null;
//		}
//		return provider;
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
