import { TravelerTrip } from "./traveler-trip";
import { User } from "./user";

export class Traveler {
  id: number;
  firstName: string;
  lastName: string;
  user: User;
  photoUrl: string;
  trips: TravelerTrip[];
  value: any;

  constructor({
    id,
    firstName,
    lastName,
    user,
    photoUrl,
    trips
  }: {
    id?: number;
    firstName?: string;
    lastName?: string;
    user?: User;
    photoUrl?: string;
    trips?: TravelerTrip[];
  } = {}) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.user = user;
    this.photoUrl = photoUrl;
    this.trips = trips;
  }
}
