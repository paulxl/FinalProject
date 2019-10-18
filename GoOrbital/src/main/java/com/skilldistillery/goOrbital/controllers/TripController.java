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

import com.skilldistillery.goOrbital.entities.Trip;
import com.skilldistillery.goOrbital.services.TripService;

@RequestMapping("api")
@RestController
@CrossOrigin({"*", "http://localhost:4210"})
public class TripController {


	@Autowired
	private TripService svr;

//	ping check
	@GetMapping("trip/ping")
	public String ping()
	{ return "pong";  }

	
//	Return all trips     GET api/trip
	@GetMapping("trip")
	public List<Trip> index() {
		return svr.index();
	}
	
//	Return trip by id     GET api/trip/{id} 
	@GetMapping("trip/{tid}")
	public Trip getTripById(@PathVariable int tid, HttpServletResponse resp) {

		Trip trip;

		try {
			trip = svr.findById(tid);
			if (trip == null) {
				resp.setStatus(400);
			} else {
				resp.setStatus(200);
			}
		} catch (Exception e) {
			resp.setStatus(404);
			e.printStackTrace();
			trip = null;
		}
		return trip;
	}

//  Create new Trip   POST api/trip
	@PostMapping("trip")
	public Trip create(@RequestBody Trip trip, HttpServletResponse resp, HttpServletRequest req) {
		try {
			trip = svr.create(trip);
			resp.setStatus(201);
            StringBuffer url = req.getRequestURL();
            url.append("/");
            url.append(trip.getId());
            resp.setHeader("Location", url.toString());
        } catch (Exception e) {
            resp.setStatus(400);
            trip = null;
            e.printStackTrace();
        }
		return trip;
	}

//	Update / Edit Trip           PUT api.trip{tid}
	@PutMapping("trip/{tid}")
	public Trip replaceTrip(@PathVariable int tid, @RequestBody Trip trip, HttpServletRequest req, HttpServletResponse res
			) {

		try {
			trip.setId(tid);
			trip = svr.update(trip, tid);

			if (trip == null) {
				res.setStatus(404);
			}

		} catch (Exception e) {
			trip = null;
			res.setStatus(400);
			e.printStackTrace();
		}
		return trip;
	}
	
	@DeleteMapping("trip/{tid}")
	public Boolean destroyTripById(@PathVariable int tid, HttpServletResponse resp, HttpServletRequest req) {
		Boolean status;

		try {
			status = svr.delete(tid);
			if (status) {
				resp.setStatus(204);
				status = true;
			} else {
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

