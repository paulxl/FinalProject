package com.skilldistillery.goOrbital.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.goOrbital.entities.Traveler;
import com.skilldistillery.goOrbital.services.TravelerService;

	@RestController
	@RequestMapping("api")
	public class TravelerController {
		
		@Autowired
		TravelerService serv;
		
		@GetMapping("traveler/ping")
		public String ping() {
			return "pong\n";
		}
		
//		Return Type	List<traveler>	GET api/traveler	Gets all traveler
		@GetMapping("traveler")
		public List<Traveler> allTravelers() {
			return serv.index();
		}

//		Return Type	traveler	GET api/traveler/{id}	Gets one traveler by id
		@GetMapping("traveler/{id}")
		public Traveler getTravelerById(@PathVariable int id, HttpServletResponse resp) {
			Traveler traveler;
			try {
				traveler = serv.findById(id);
				if (traveler == null) {
					resp.setStatus(400);
				}else {
					resp.setStatus(200);
				}
			} catch (Exception e) {
				resp.setStatus(404);
				e.printStackTrace();
				traveler = null;
			}
			
			return traveler;
		}

//		Return Type	traveler	POST api/travelers	Creates a new traveler
		@PostMapping("traveler")
		public Traveler createTraveler(@RequestBody Traveler traveler, HttpServletResponse resp,HttpServletRequest req) {
			try {
				traveler = serv.create(traveler);
	            resp.setStatus(201);
	            StringBuffer url = req.getRequestURL();
	            url.append("/");
	            url.append(traveler.getId());
	            resp.setHeader("Location", url.toString());
	        } catch (Exception e) {
	            resp.setStatus(400);
	            traveler = null;
	            e.printStackTrace();
	        }
	        return traveler;
	    }

//		Return Type	traveler	PUT api/traveler/{id}	Replaces an existing traveler by id
		@PutMapping("traveler/{id}")
		public Traveler replace(@PathVariable int id, @RequestBody Traveler traveler, HttpServletResponse resp) {
			try {
				traveler.setId(id);
				traveler = serv.update(traveler, id);
				
				if (traveler == null) {
					resp.setStatus(404);
				}
			} catch (Exception e) {
				traveler = null;
				resp.setStatus(400);
				e.printStackTrace();
			}
			return traveler;
		}

//		Return Type	Boolean	DELETE api/traveler/{id}	Deletes an existing traveler by id
		@DeleteMapping("traveler/{id}")
		public Boolean destroyTravelerById(@PathVariable int id, HttpServletResponse resp) {
			Boolean status;
			try {
				status = serv.delete(id);
				if (status) {
					resp.setStatus(204);
					status = true;
				}else {
					status = false;
					resp.setStatus(404);
				}
			} catch (Exception e) {
				status = false;
				resp.setStatus(400);
				e.printStackTrace();
			}
			return status;
		}
		


}
