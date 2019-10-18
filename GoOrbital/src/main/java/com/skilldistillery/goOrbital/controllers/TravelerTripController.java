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

import com.skilldistillery.goOrbital.entities.TravelerTrip;
import com.skilldistillery.goOrbital.services.TravelerTripService;

	@RestController
	@RequestMapping("api")
	public class TravelerTripController {
		
		@Autowired
		TravelerTripService serv;
		
		@GetMapping("travelerTrip/ping")
		public String ping() {
			return "pong\n";
		}
		
//		Return Type	List<travelerTrip>	GET api/travelerTrip	Gets all travelerTrip
		@GetMapping("travelerTrip")
		public List<TravelerTrip> allTravelerTrips() {
			return serv.index();
		}

//		Return Type	travelerTrip	GET api/travelerTrip/{id}	Gets one travelerTrip by id
		@GetMapping("travelerTrip/{id}")
		public TravelerTrip getTravelerTripById(@PathVariable int id, HttpServletResponse resp) {
			TravelerTrip travelerTrip;
			try {
				travelerTrip = serv.findById(id);
				if (travelerTrip == null) {
					resp.setStatus(400);
				}else {
					resp.setStatus(200);
				}
			} catch (Exception e) {
				resp.setStatus(404);
				e.printStackTrace();
				travelerTrip = null;
			}
			
			return travelerTrip;
		}

//		Return Type	travelerTrip	POST api/travelerTrips	Creates a new travelerTrip
		@PostMapping("travelerTrip")
		public TravelerTrip createTravelerTrip(@RequestBody TravelerTrip travelerTrip, HttpServletResponse resp,HttpServletRequest req) {
			try {
				travelerTrip = serv.create(travelerTrip);
	            resp.setStatus(201);
	            StringBuffer url = req.getRequestURL();
	            url.append("/");
	            url.append(travelerTrip.getId());
	            resp.setHeader("Location", url.toString());
	        } catch (Exception e) {
	            resp.setStatus(400);
	            travelerTrip = null;
	            e.printStackTrace();
	        }
	        return travelerTrip;
	    }

//		Return Type	travelerTrip	PUT api/travelerTrip/{id}	Replaces an existing travelerTrip by id
		@PutMapping("travelerTrip/{id}")
		public TravelerTrip replace(@PathVariable int id, @RequestBody TravelerTrip travelerTrip, HttpServletResponse resp) {
			try {
				travelerTrip.setId(id);
				travelerTrip = serv.update(travelerTrip, id);
				
				if (travelerTrip == null) {
					resp.setStatus(404);
				}
			} catch (Exception e) {
				travelerTrip = null;
				resp.setStatus(400);
				e.printStackTrace();
			}
			return travelerTrip;
		}

//		Return Type	Boolean	DELETE api/travelerTrip/{id}	Deletes an existing travelerTrip by id
		@DeleteMapping("travelerTrip/{id}")
		public Boolean destroyTravelerTripById(@PathVariable int id, HttpServletResponse resp) {
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
