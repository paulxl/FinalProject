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

import com.skilldistillery.goOrbital.entities.TravelerTrip;
import com.skilldistillery.goOrbital.services.TravelerTripService;

@RequestMapping("api")
@RestController
@CrossOrigin({ "*", "http://localhost:4210" })
public class TravelerTripController {

	@Autowired
	private TravelerTripService tts;

	@GetMapping("ping")
	public String ping() {
		return "pong/n";
	}

	@GetMapping(path = "travelerTrips")
	public List<TravelerTrip> index() {
		return tts.index();
	}
	
	@PostMapping("travelerTrip")
	public TravelerTrip create(@RequestBody TravelerTrip travelerTrip) {
		travelerTrip = tts.create(travelerTrip);
		return travelerTrip;
	}

	@GetMapping(path = "travelerTrip/{ttid}")
	public TravelerTrip show(@PathVariable Integer ttid, HttpServletResponse resp) {

		TravelerTrip travelerTrip;
		
		try {
			travelerTrip = tts.findById(ttid);
		} catch (Exception e) {
			resp.setStatus(400);
			travelerTrip = null;
			e.printStackTrace();
		}
		return travelerTrip;
	}
	
	@DeleteMapping("travelerTrip/{ttid}")
	public void destroy(@PathVariable("ttid") int ttid, HttpServletResponse resp, HttpServletRequest req) {
		try { 
			if (ttid < 0) {
				resp.setStatus(404);
			} else {
				boolean status = tts.delete(ttid);
				if (status) {
					resp.setStatus(204);
				} else {
					resp.setStatus(400);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(400);
	}
}
	@PutMapping("travelerTrip/{ttid}")
	public TravelerTrip replaceTrip(HttpServletRequest req, HttpServletResponse res, @PathVariable("ttid") int ttid, @RequestBody TravelerTrip travelerTrip) {
		
		try {
			travelerTrip = tts.update(travelerTrip, ttid);
			if (travelerTrip == null) {
				res.setStatus(404); 
			} else {
				res.setStatus(201);
			}
		} catch (Exception e) {
			res.setStatus(400);
			e.printStackTrace();
		} 
		return travelerTrip; 
	}
	
}









