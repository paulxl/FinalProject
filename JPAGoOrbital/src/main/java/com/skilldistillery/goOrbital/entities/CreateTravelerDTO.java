package com.skilldistillery.goOrbital.entities;

public class CreateTravelerDTO {
	// user fields
	private String username;
	private String password;
	private String email;

	// Traveler fields
	private String firstName;
	private String lastName;
	private String photoUrl;


	public CreateTravelerDTO(String username, String password, String email, String firstName, String lastName,
			String photoUrl) {
		this.username = username;
		this.password = password;
		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
		this.photoUrl = photoUrl;
	}


	public CreateTravelerDTO() {
	}


	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getFirstName() {
		return firstName;
	}


	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}


	public String getLastName() {
		return lastName;
	}


	public void setLastName(String lastName) {
		this.lastName = lastName;
	}


	public String getPhotoUrl() {
		return photoUrl;
	}


	public void setPhotoUrl(String photoUrl) {
		this.photoUrl = photoUrl;
	}
}