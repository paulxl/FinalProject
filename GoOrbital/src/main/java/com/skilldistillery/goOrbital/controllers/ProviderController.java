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
	

	@PutMapping(path ="provider/{pid}")
	public Provider update(@PathVariable("pid") Integer pid, 
			@RequestBody Provider provider, HttpServletResponse resp,
			HttpServletRequest req) {

		try {
			provider.setId(pid);
			provider =  svr.update(provider, pid);
			
			if (provider == null) 
			{resp.setStatus(404);}
			
		} catch (Exception e) {
			resp.setStatus(400);
			provider = null;
			e.printStackTrace();
		}
		return provider;
		
	}

	@DeleteMapping(path ="provider/{id}")
	public void delete(@PathVariable Integer id, HttpServletRequest req, HttpServletResponse resp) {
		Boolean status;
		
		try {
			status = svr.delete(id);
			if (status) {
				status = true;
				resp.setStatus(204);
			} else {
				status = false;
				resp.setStatus(204);
			}
		} catch (Exception e) {
			status = false;
			resp.setStatus(400);
			e.printStackTrace();
		}
	}
	

}
