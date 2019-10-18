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
public class Provider {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String name;

	@OneToOne
	@JoinColumn(name = "user_id")
	private User user;

	@Column(name = "logo_url")
	private String logoUrl;
	
	@Column(name = "web_url")
	private String webUrl;
	
	@JsonManagedReference
	@OneToMany(mappedBy="provider")
	private List<Vehicle> vehicles;
	
	@JsonManagedReference
	@OneToMany(mappedBy = "provider")
	private List<Trip> trips;
	
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getLogoUrl() {
		return logoUrl;
	}

	public void setLogoUrl(String logoUrl) {
		this.logoUrl = logoUrl;
	}

	public String getWebUrl() {
		return webUrl;
	}

	public void setWebUrl(String webUrl) {
		this.webUrl = webUrl;
	}


	public int getId() {
		return id;
	}

	public Provider(int id, String name, String logoUrl, String webUrl) {
		super();
		this.id = id;
		this.name = name;
		this.logoUrl = logoUrl;
		this.webUrl = webUrl;
	}

	public Provider(int id, String name, String logoUrl, String webUrl, List<Vehicle> vehicles, List<Trip> trips) {
		super();
		this.id = id;
		this.name = name;
		this.logoUrl = logoUrl;
		this.webUrl = webUrl;
		this.vehicles = vehicles;
		this.trips = trips;
	}

	public Provider() {
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Vehicle> getVehicles() {
		return vehicles;
	}

	public void setVehicles(List<Vehicle> vehicles) {
		this.vehicles = vehicles;
	}

	public List<Trip> getTrips() {
		return trips;
	}

	public void setTrips(List<Trip> trips) {
		this.trips = trips;
	}

	@Override
	public String toString() {
		return "Provider [id=" + id + ", name=" + name + "]";
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
		Provider other = (Provider) obj;
		if (id != other.id)
			return false;
		return true;
	}

}
