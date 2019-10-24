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

import com.skilldistillery.goOrbital.entities.Vehicle;
import com.skilldistillery.goOrbital.services.VehicleService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost:4210" })
public class VehicleController {

	@Autowired
	VehicleService serv;

	@GetMapping("vehicle/ping")
	public String ping() {
		return "pong\n";
	}

//		Return Type	List<vehicle>	GET api/vehicle	Gets all vehicle
	@GetMapping("vehicle")
	public List<Vehicle> allVehicles() {
		return serv.index();
	}

//		Return Type	vehicle	GET api/vehicle/{id}	Gets one vehicle by id
	@GetMapping("vehicle/{id}")
	public Vehicle getVehicleById(@PathVariable int id, HttpServletResponse resp) {
		Vehicle vehicle;
		try {
			vehicle = serv.findById(id);
			if (vehicle == null) {
				resp.setStatus(400);
			} else {
				resp.setStatus(200);
			}
		} catch (Exception e) {
			resp.setStatus(404);
			e.printStackTrace();
			vehicle = null;
		}

		return vehicle;
	}

//		Return Type	vehicle	POST api/vehicles	Creates a new vehicle
	@PostMapping("vehicle")
	public Vehicle createVehicle(@RequestBody Vehicle vehicle, HttpServletResponse resp, HttpServletRequest req) {
		try {
			vehicle = serv.create(vehicle);
			resp.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/");
			url.append(vehicle.getId());
			resp.setHeader("Location", url.toString());
		} catch (Exception e) {
			resp.setStatus(400);
			vehicle = null;
			e.printStackTrace();
		}
		return vehicle;
	}

//		Return Type	vehicle	PUT api/vehicle/{id}	Replaces an existing vehicle by id
	@PutMapping("vehicle/{id}")
	public Vehicle replace(@PathVariable int id, @RequestBody Vehicle vehicle, HttpServletResponse resp) {
		try {
			vehicle.setId(id);
			vehicle = serv.update(vehicle, id);

			if (vehicle == null) {
				resp.setStatus(404);
			}
		} catch (Exception e) {
			vehicle = null;
			resp.setStatus(400);
			e.printStackTrace();
		}
		return vehicle;
	}

//		Return Type	Boolean	DELETE api/vehicle/{id}	Deletes an existing vehicle by id
	@DeleteMapping("vehicle/{id}")
	public Boolean destroyVehicleById(@PathVariable int id, HttpServletResponse resp) {
		Boolean status;
		try {
			status = serv.delete(id);
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
