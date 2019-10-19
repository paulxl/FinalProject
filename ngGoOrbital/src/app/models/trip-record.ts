import { Trip } from './trip';
import { Traveler } from './traveler';

export class TripRecord {
  id: number;
  trip: Trip;
  traveler: Traveler;
  reviewDate: Date = new Date();
  rating: number;
  review: string;
  tripNote: string;
}
