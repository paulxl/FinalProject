package com.skilldistillery.goOrbital.entities;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonManagedReference;


@Entity
public class Traveler {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(name = "first_name")
	private String firstName;

	@Column(name = "last_name")
	private String lastName;

	@OneToOne
	@JoinColumn(name = "user_id")
	private User user;

	@Column(name = "photo_url")
	private String photoUrl;
	
	@JsonManagedReference(value = "TTrTraveler")
	@OneToMany(mappedBy = "traveler")
	private List<TravelerTrip> trips;

	public Traveler() {
	}

	public Traveler(int id, String firstName, String lastName, User user, String photoUrl) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.user = user;
		this.photoUrl = photoUrl;
	}

	public Traveler(int id, String firstName, String lastName, User user, String photoUrl, List<TravelerTrip> trips) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.user = user;
		this.photoUrl = photoUrl;
		this.trips = trips;
	}

	@Override
	public String toString() {
		return "Traveler [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", user=" + user
				+ ", photoUrl=" + photoUrl + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Traveler other = (Traveler) obj;
		if (id != other.id)
			return false;
		return true;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getPhotoUrl() {
		return photoUrl;
	}

	public void setPhotoUrl(String photoUrl) {
		this.photoUrl = photoUrl;
	}

	public List<TravelerTrip> getTrips() {
		return trips;
	}

	public void setTrips(List<TravelerTrip> trips) {
		this.trips = trips;
	}

}
