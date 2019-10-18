package com.skilldistillery.goOrbital.controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

	
	@GetMapping("ping")
	public String ping()
	{ return "pong/n";  }

	@GetMapping(path ="trips")
	public List<Trip> index() {
		return svr.index();
	}
	//"status": 500,
	// Failed :    "error": "Internal Server Error",
  //  "message": "Could not write JSON: (was java.lang.NullPointerException); nested exception is 
	

	
//	@RequestMapping(path = "/authenticate", method = RequestMethod.GET)
//	public Principal authenticate(Principal principal) {
//	    return principal;
//	}
	
	@GetMapping(path ="trip/{tripId}")
	public Trip show(@PathVariable Integer tripId, HttpServletResponse resp) {
		
		Trip trip;
		try {
			trip = svr.findById(tripId);
		} catch (Exception e) {
			resp.setStatus(400);
			trip = null;
			e.printStackTrace();
		}
		 
		return trip;
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

