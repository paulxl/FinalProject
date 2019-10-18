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
	private TravelerTripService serv;

//	ping check
	@GetMapping("travelerTrip/ping")
	public String ping() {
		return "pong";
	}

//	Return all traveler trips    GET api/travelerTrip
	@GetMapping("travelerTrip")
	public List<TravelerTrip> allTravelerTrips() {
		return serv.index();
	}

//	Return trip by id     GET api/traavelerTrip/{id} 
	@GetMapping(path = "travelerTrip/{ttid}")
	public TravelerTrip getTravelerTripById(@PathVariable int ttid, HttpServletResponse resp) {

		TravelerTrip travelerTrip;

		try {
			travelerTrip = serv.findById(ttid);
			if (travelerTrip == null) {
				resp.setStatus(400);
			} else {
				resp.setStatus(200);
			}
		} catch (Exception e) {
			resp.setStatus(404);
			e.printStackTrace();
			travelerTrip = null;
		}
		return travelerTrip;
	}

//  Create new TravelerTrip   POST api/travelerTrip
	@PostMapping("travelerTrip")
	public TravelerTrip create(@RequestBody TravelerTrip travelerTrip, HttpServletResponse resp, HttpServletRequest req) {
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

//	Update / Edit Trip           PUT api.travelerTrip{ttid}
	@PutMapping("travelerTrip/{ttid}")
	public TravelerTrip replaceTrip(@PathVariable int ttid, @RequestBody TravelerTrip travelerTrip, HttpServletRequest req, HttpServletResponse res
			) {

		try {
			travelerTrip.setId(ttid);
			travelerTrip = serv.update(travelerTrip, ttid);

			if (travelerTrip == null) {
				res.setStatus(404);
			}

		} catch (Exception e) {
			travelerTrip = null;
			res.setStatus(400);
			e.printStackTrace();
		}
		return travelerTrip;
	}
	
	@DeleteMapping("travelerTrip/{ttid}")
	public Boolean destroyTravelerTripById(@PathVariable int ttid, HttpServletResponse resp, HttpServletRequest req) {
		Boolean status;

		try {
			status = serv.delete(ttid);
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
