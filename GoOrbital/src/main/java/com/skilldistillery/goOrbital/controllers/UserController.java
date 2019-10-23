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
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.goOrbital.entities.User;
import com.skilldistillery.goOrbital.services.UserService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost:4210" })
public class UserController {

	@Autowired
	UserService serv;

	@GetMapping("user/ping")
	public String ping() {
		return "pong\n";
	}

//		Return Type	List<user>	GET api/user	Gets all user
	@GetMapping("user")
	public List<User> allUsers() {
		return serv.index();
	}

//		Return Type	user	GET api/user/{id}	Gets one user by id
	@GetMapping("user/{id}")
	public User getUserById(@PathVariable int id, HttpServletResponse resp) {
		User user;

		try {
			user = serv.findById(id);
			if (user == null) {
				resp.setStatus(400);
			} else {
				resp.setStatus(200);
			}
		} catch (Exception e) {
			resp.setStatus(404);
			e.printStackTrace();
			user = null;
		}

		return user;
	}

//		Return Type	user	GET api/user/{keyword}	Gets one user by id
	@GetMapping("user/username/{keyword}")
	public User getUserByKeyword(@PathVariable String keyword, HttpServletResponse resp, Principal principal) {
		User user;

		try {
			user = serv.findByUsername(keyword);
			if (user == null) {
				resp.setStatus(400);
			} else {
				resp.setStatus(200);
			}
		} catch (Exception e) {
			resp.setStatus(404);
			e.printStackTrace();
			user = null;
		}

		return user;
	}

//		Return Type	user	POST api/users	Creates a new user
	@PostMapping("user")
	public User createUser(@RequestBody User user, HttpServletResponse resp, HttpServletRequest req) {
		try {
			user = serv.create(user);
			resp.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/");
			url.append(user.getId());
			resp.setHeader("Location", url.toString());
		} catch (Exception e) {
			resp.setStatus(400);
			user = null;
			e.printStackTrace();
		}
		return user;
	}

//		Return Type	user	PUT api/user/{id}	Replaces an existing user by id
	@PutMapping("user/{id}")
	public User replace(@PathVariable int id, @RequestBody User user, HttpServletResponse resp) {
		try {
			user.setId(id);
			user = serv.update(user, id);

			if (user == null) {
				resp.setStatus(404);
			}
		} catch (Exception e) {
			user = null;
			resp.setStatus(400);
			e.printStackTrace();
		}
		return user;
	}

//		Return Type	Boolean	DELETE api/user/{id}	Deletes an existing user by id
	@DeleteMapping("user/{id}")
	public Boolean destroyUserById(@PathVariable int id, HttpServletResponse resp) {
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
