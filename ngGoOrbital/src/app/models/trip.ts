import { Companies } from "src/app/models/companies";
import { Launchport } from "./launchport";
import { Vehicle } from "./vehicle";
import { Traveler } from "./traveler";

export class Trip {
  id: number;
  travelers: Traveler[];
  companies: Companies;
  vehicle: Vehicle;
  launchport: Launchport;
  title: string;
  destination: string;
  cost: number;
  tripLength: number;
  tripDate: Date;
  photoURL: string;

  constructor(
    id?: number,
    travelers?: Traveler[],
    companies?: Companies,
    vehicle?: Vehicle,
    launchport?: Launchport,
    title?: string,
    destination?: string,
    cost?: number,
    tripLength?: number,
    tripDate?: Date,
    photoURL?: string
  ) {
    this.id = id;
    this.travelers = travelers;
    this.companies = companies;
    this.vehicle = vehicle;
    this.launchport = launchport;
    this.title = title;
    this.destination = destination;
    this.cost = cost;
    this.tripLength = tripLength;
    this.tripDate = tripDate;
    this.photoURL = photoURL;
  }
}
// export class Trip implements Deserializable {
//    id: number;
//    travelers: Traveler[];
//    provider: Provider;
//    vehicle: Vehicle;
//    launchport: Launchport;
//    title: string;
//    destination: string;
//    cost: number;
//    tripLength: number;
//    tripDate: Date = new Date();
//    photoURL: string;

//   deserialize(input: any): this {
//     Object.assign(this, input);
//     this.provider = new Provider().deserialize(input.provider);
//     this.vehicle = new Vehicle().deserialize(input.vehicle);
//     this.launchport = new Launchport().deserialize(input.launchport);
//     this.travelers = input.travelers.map(( (traveler: Traveler) => {
//       return new Traveler().deserialize(traveler);
//     }));
//     return this;
//   }

// }
