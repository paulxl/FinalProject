

import { Trip } from './trip';
import { Traveler } from './traveler';

export class TravelerTrip {
  id: number;
  dateCompleted: Date;
  rating: number;
  review: string;
  tripNote: string;
  trip: Trip;
  traveler: Traveler;
  

  constructor(
    id?: number,
    dateCompleted?: Date,
    rating?: number,
    review?: string,
    tripNote?: string,
    trip?: Trip,
    traveler?: Traveler,
    
  ) {
    this.id = id;
    this.dateCompleted = dateCompleted;
    this.rating = rating;
    this.review = review;
    this.tripNote = tripNote;
    this.trip = trip;
    this.traveler = traveler;
    
  }
}
