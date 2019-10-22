
import { TravelerTrip } from './traveler-trip';
import { User } from './user';


export class Traveler {
  id: number;
  firstName: string;
  lastName: string;

  user: User;
  photoURL: string;
  travelerTrip: TravelerTrip;
  value: any;

  constructor({
    id,
    firstName,
    lastName,
    user,
    photoURL,
    travelerTrip
  }: {
    id?: number;
    firstName?: string;
    lastName?: string;
    user?: User;
    photoURL?: string;
    travelerTrip?: TravelerTrip;
  } = {}) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.user = user;
    this.photoURL = photoURL;
    this.travelerTrip = travelerTrip;
  }
}
