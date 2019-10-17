package com.skilldistillery.goOrbital.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Trip {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@JoinColumn(name = "provider_id")
	private Provider provider;

	@JoinColumn(name = "vehicle_id")
	private Vehicle vehicle;

	@ManyToOne
	@JoinColumn(name = "launchport_id")
	private Launchport launchport;

	private String title;

	private String destination;

	private int cost;

	@Column(name = "length_trip")
	private int length;

	@Column(name = "trip_date")
	private LocalDate date;

	@Column(name = "photo_url")
	private String photoUrl;

	public Trip() {
	}

	public Trip(int id, Provider provider, Vehicle vehicle, Launchport launchport, String title, String destination,
			int cost, int length, LocalDate date, String photoUrl) {
		super();
		this.id = id;
		this.provider = provider;
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

	public Provider getProvider() {
		return provider;
	}

	public void setProvider(Provider provider) {
		this.provider = provider;
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

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
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