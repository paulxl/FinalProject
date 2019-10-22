import { Companies } from "src/app/models/companies";
import { Trip } from './trip';

export class Vehicle {
  id: number;
  companies: Companies;
  name: string;
  type: string;
  description: string;
  range: number;
  capactity: number;
  photoURL: string;
  trips: Trip[];

  constructor(
    id?: number,
    companies?: Companies,
    name?: string,
    type?: string,
    description?: string,
    range?: number,
    capactity?: number,
    photoURL?: string,
    trips?: Trip[],
  ) {
    this.id = id;
    this.companies = companies;
    this.name = name;
    this.type = type;
    this.description = description;
    this.range = range;
    this.capactity = capactity;
    this.photoURL = photoURL;
    this.trips = trips;
  }
}

