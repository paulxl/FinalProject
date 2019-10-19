import { Deserializable } from './../interfaces/deserializable';
import { Trip } from './trip';
import { Traveler } from './traveler';

export class TripRecord implements Deserializable {
  id: number;
  trip: Trip;
  traveler: Traveler;
  reviewDate: Date = new Date();
  rating: number;
  review: string;
  tripNote: string;

  deserialize(input: any): this {
     Object.assign(this, input);
     this.id = input.id;
     this.traveler = new Traveler().deserialize(input.traveler);
     this.trip = new Trip().deserialize(input.trip);
     return this;
  }
}
