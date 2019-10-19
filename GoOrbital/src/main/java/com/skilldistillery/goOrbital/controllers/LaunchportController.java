package com.skilldistillery.goOrbital.controllers;

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
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.goOrbital.entities.Launchport;
import com.skilldistillery.goOrbital.entities.Provider;
import com.skilldistillery.goOrbital.services.LaunchportService;
import com.skilldistillery.goOrbital.services.ProviderService;

@RequestMapping("api")
@RestController
@CrossOrigin({"*", "http://localhost:4210"})
public class LaunchportController {
	
	@Autowired
	private LaunchportService svr;

	
	@GetMapping("/launchport/ping")
	public String ping(){ 
		return "pong-pong-on-the-launchpad"; 
		}
	@GetMapping(path ="launchport")
	public List<Launchport> index() {
		return svr.index();
	}
	@GetMapping(path ="launchport/{lid}")
	public Launchport getById(@PathVariable("lid") Integer lid, HttpServletResponse resp) {
		Launchport lp;
		
		try {
			lp = svr.findById(lid);
			if (lp != null) {
				resp.setStatus(200);
			}else {
				resp.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(400);
			return null;
		}
		return lp;
	}
	@PostMapping(path ="launchport")
	public Launchport create(@RequestBody Launchport launchport, HttpServletResponse resp, HttpServletRequest req) {
		
		try {
			svr.create(launchport);
			resp.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/");
			url.append(launchport.getId());
			resp.setHeader("Location", url.toString());
		} catch (Exception e) {
			resp.setStatus(400);
			launchport = null;
			e.printStackTrace();
		}
		return launchport;
	}
	
	@PutMapping(path ="launchport/{lid}")
	public Launchport update(@PathVariable("lid") Integer pid, 
			@RequestBody Launchport launchport, HttpServletResponse resp,
			HttpServletRequest req) {

		try {
			launchport.setId(pid);
			launchport =  svr.update(launchport, pid);
			
			if (launchport == null) 
			{resp.setStatus(404);}
			
		} catch (Exception e) {
			resp.setStatus(400);
			launchport = null;
			e.printStackTrace();
		}
		return launchport;	
	}
	@DeleteMapping(path ="launchport/{lid}")
	public void delete(@PathVariable Integer lid, HttpServletRequest req, HttpServletResponse resp) {
		Boolean status;
		
		try {
			status = svr.delete(lid);
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
