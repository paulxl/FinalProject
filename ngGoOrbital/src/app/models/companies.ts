import { Vehicle } from './vehicle';
import { Trip } from './trip';
import { User } from './user';

export class Companies {
  id: number;
  name: string;
  user: User;
  logoURL: string;
  webURL: string;
  vehicles: Vehicle;
  trips: Trip;

  constructor(
    id?: number,
    user?: User,
    name?: string,
    logoURL?: string,
    webURL?: string,
    vehicles?: Vehicle,
    trip?: Trip,
  ) {
    {
      this.id = id;
      this.user = user;
      this.name = name;
      this.logoURL = logoURL;
      this.webURL = webURL;
      this.vehicles = vehicles;
      this.trips = trip;
    }
  }
}
