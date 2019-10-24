
import { Vehicle } from './vehicle';
import { Trip } from './trip';
import { User } from './user';

export class Companies {
  id: number;
  name: string;
  user: User;
  logoUrl: string;
  webUrl: string;
  vehicles: Vehicle[];
  trips: Trip[];

  constructor(
    id?: number,
    user?: User,
    name?: string,
    logoUrl?: string,
    webUrl?: string,
    vehicles?: Vehicle[],
    trips?: Trip[],
  ) {
    {
      this.id = id;
      this.user = user;
      this.name = name;
      this.logoUrl = logoUrl;
      this.webUrl = webUrl;
      this.vehicles = vehicles;
      this.trips = trips;
    }

  }
}
