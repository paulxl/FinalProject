<<<<<<< HEAD
import { Trip } from './trip';
import { Deserializable } from './../interfaces/deserializable';
=======

// import { Deserializable } from './../interfaces/deserializable';
import { Trip } from './trip';
>>>>>>> 35d152cc29bc61460b4dba8dbb1eef418ad109cb
import { Traveler } from './traveler';

export class TripRecord {
  id: number;
  trip: Trip;
  traveler: Traveler;
  reviewDate: Date = new Date();
  rating: number;
  review: string;
  tripNote: string;

  constructor(
    id: number,
    trip?: Trip,
    traveler?: Traveler,
    reviewDate: Date = new Date(),
    rating?: number,
    review?: string,
    tripNote?: string,
  ) {
    this.id = id;
    this.trip = trip;
    this.traveler = traveler;
    this.reviewDate = reviewDate;
    this.rating = rating;
    this.review = review;
    this.tripNote = tripNote;
  }
}


// export class TripRecord implements Deserializable {
//   id: number;
//   trip: Trip;
//   traveler: Traveler;
//   reviewDate: Date = new Date();
//   rating: number;
//   review: string;
//   tripNote: string;

//   deserialize(input: any): this {
//      Object.assign(this, input);
//      this.id = input.id;
//      this.traveler = new Traveler().deserialize(input.traveler);
//      this.trip = new Trip().deserialize(input.trip);
//      return this;
//   }
// }
