
import { TripRecord } from './traveler-trip';
import { User } from './user';


export class Traveler {
  id: number;
  firstName: string;
  lastName: string;

  user: User;
  photoURL: string;
  tripRecord: TripRecord;
  value: any;

  constructor({ id, firstName, lastName, user, photoURL, tripRecord, }: { id?: number; firstName?: string; lastName?:  string; user?: User; photoURL?: string; tripRecord?: TripRecord;  }={})

  {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.user = user;
    this.photoURL = photoURL;
    this.tripRecord = tripRecord;

  }
}
