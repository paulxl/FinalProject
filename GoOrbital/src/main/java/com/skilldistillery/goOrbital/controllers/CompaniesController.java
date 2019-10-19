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

import com.skilldistillery.goOrbital.entities.Companies;
import com.skilldistillery.goOrbital.services.CompaniesService;

@RequestMapping("api")
@RestController
@CrossOrigin({"*", "http://localhost:4210"})
public class CompaniesController {


	@Autowired
	private CompaniesService svr;

	
	@GetMapping("ping")
	public String ping()
	{ return "pong/n";  }

	
	//err
	@GetMapping(path ="companies")
	public List<Companies> index() {
		return svr.index();
	}

	//works		
	@GetMapping(path ="companies/{cid}")
	public Companies getById(@PathVariable("cid") Integer cid, HttpServletResponse resp) {
		Companies companies;
		
		try {
			companies = svr.findById(cid);
			if (companies != null) {
				resp.setStatus(200);
			}else {
				resp.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(400);
			return null;
		}
		return companies;
		
	}


	
	@PostMapping(path ="companies")
	public Companies create(@RequestBody Companies companies, HttpServletResponse resp, HttpServletRequest req) {
		try {
			svr.create(companies);
			resp.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/");
			url.append(companies.getId());
			resp.setHeader("Location", url.toString());
		} catch (Exception e) {
			resp.setStatus(400);
			companies = null;
			e.printStackTrace();
		}
		return companies;
	}
	

	@PutMapping(path ="companies/{cid}")
	public Companies update(@PathVariable("cid") Integer cid, 
			@RequestBody Companies companies, HttpServletResponse resp,
			HttpServletRequest req) {

		try {
			companies.setId(cid);
			companies =  svr.update(companies, cid);
			
			if (companies == null) 
			{resp.setStatus(404);}
			
		} catch (Exception e) {
			resp.setStatus(400);
			companies = null;
			e.printStackTrace();
		}
		return companies;
		
	}

	@DeleteMapping(path ="companies/{id}")
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
