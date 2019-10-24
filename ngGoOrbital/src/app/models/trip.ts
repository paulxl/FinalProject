import { Companies } from 'src/app/models/companies';
import { Launchport } from './launchport';
import { Vehicle } from './vehicle';
import { Traveler } from './traveler';

export class Trip {
  id: number;
  travelers: Traveler[];
  companies: Companies;
  vehicle: Vehicle;
  launchport: Launchport;
  title: string;
  destination: string;
  cost: number;
  length: number;
  date: Date;
  photoUrl: string;

  constructor(
    id?: number,
    travelers?: Traveler[],
    companies?: Companies,
    vehicle?: Vehicle,
    launchport?: Launchport,
    title?: string,
    destination?: string,
    cost?: number,
    length?: number,
    date?: Date,
    photoUrl?: string
  ) {
    this.id = id;
    this.travelers = travelers;
    this.companies = companies;
    this.vehicle = vehicle;
    this.launchport = launchport;
    this.title = title;
    this.destination = destination;
    this.cost = cost;
    this.length = length;
    this.date = date;
    this.photoUrl = photoUrl;
  }
}
