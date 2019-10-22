package com.skilldistillery.goOrbital.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "traveler_trip")
public class TravelerTrip {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(name = "date_completed")
	private Date dateCompleted;

	private Integer rating;

	private String review;

	@Column(name = "trip_note")
	private String tripNote;
	
	@ManyToOne
	@JoinColumn(name = "trip_id")
	private Trip trip;
	
	@JsonBackReference(value = "TTrTraveler")
	@ManyToOne
	@JoinColumn(name = "traveler_id")
	private Traveler traveler;

	public TravelerTrip() {
	}

	public TravelerTrip(int id, Date dateCompleted, Integer rating, String review, String tripNote) {
		this.id = id;
		this.dateCompleted = dateCompleted;
		this.rating = rating;
		this.review = review;
		this.tripNote = tripNote;
	}

	@Override
	public String toString() {
		return "TravelerTrip [id=" + id + ", dateSigned"  + ", dateCompleted=" + dateCompleted
				+ ", rating=" + rating + ", review=" + review + ", tripNote=" + tripNote + "]";
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
		TravelerTrip other = (TravelerTrip) obj;
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

	public Date getDateCompleted() {
		return dateCompleted;
	}

	public void setDateCompleted(Date dateCompleted) {
		this.dateCompleted = dateCompleted;
	}

	public Integer getRating() {
		return rating;
	}

	public void setRating(Integer rating) {
		this.rating = rating;
	}

	public String getReview() {
		return review;
	}

	public void setReview(String review) {
		this.review = review;
	}

	public String getTripNote() {
		return tripNote;
	}

	public void setTripNote(String tripNote) {
		this.tripNote = tripNote;
	}

	public Trip getTrip() {
		return trip;
	}

	public void setTrip(Trip trip) {
		this.trip = trip;
	}

	public Traveler getTraveler() {
		return traveler;
	}

	public void setTraveler(Traveler traveler) {
		this.traveler = traveler;
	}

}
