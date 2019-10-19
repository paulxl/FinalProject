package com.skilldistillery.goOrbital.entities;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Trip {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@JsonBackReference(value = "companiesTrips")
	@ManyToOne
	@JoinColumn(name = "companies_id")
	private Companies companies;
	
	@JsonBackReference(value = "vehicleTrips")
	@ManyToOne
	@JoinColumn(name = "vehicle_id")
	private Vehicle vehicle;
	
	@JsonBackReference(value = "tripLaunchport")
	@ManyToOne
	@JoinColumn(name = "launchport_id")
	private Launchport launchport;

	private String title;

	private String destination;

	private int cost;

	@Column(name = "length_trip")
	private int length;

	@Column(name = "trip_date")
	private Date date;

	@Column(name = "photo_url")
	private String photoUrl;
	
	@JsonManagedReference(value = "TTrTrip")
	@OneToMany(mappedBy="trip", fetch = FetchType.EAGER)
	private List<TravelerTrip> travelers;
	

	public List<TravelerTrip> getTravelers() {
		return travelers;
	}

	public void setTravelers(List<TravelerTrip> travelers) {
		this.travelers = travelers;
	}

	public Trip() {
	}

	public Trip(int id, Companies companies, Vehicle vehicle, Launchport launchport, String title, String destination,
			int cost, int length, Date date, String photoUrl) {
		super();
		this.id = id;
		this.companies = companies;
		this.vehicle = vehicle;
		this.launchport = launchport;
		this.title = title;
		this.destination = destination;
		this.cost = cost;
		this.length = length;
		this.date = date;
		this.photoUrl = photoUrl;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Companies getcompanies() {
		return companies;
	}

	public void setcompanies(Companies companies) {
		this.companies = companies;
	}

	public Vehicle getVehicle() {
		return vehicle;
	}

	public void setVehicle(Vehicle vehicle) {
		this.vehicle = vehicle;
	}

	public Launchport getLaunchport() {
		return launchport;
	}

	public void setLaunchport(Launchport launchport) {
		this.launchport = launchport;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDestination() {
		return destination;
	}

	public void setDestination(String destination) {
		this.destination = destination;
	}

	public int getCost() {
		return cost;
	}

	public void setCost(int cost) {
		this.cost = cost;
	}

	public int getLength() {
		return length;
	}

	public void setLength(int length) {
		this.length = length;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getPhotoUrl() {
		return photoUrl;
	}

	public void setPhotoUrl(String photoUrl) {
		this.photoUrl = photoUrl;
	}

	@Override
	public String toString() {
		return "Trip [id=" + id + ", title=" + title + ", destination=" + destination + ", cost=" + cost + ", length="
				+ length + ",  date=" + date + ", photoUrl=" + photoUrl + "]";
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
		Trip other = (Trip) obj;
		if (id != other.id)
			return false;
		return true;
	}

}