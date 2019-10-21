import { Deserializable } from './../interfaces/deserializable';
import { Launchport } from './launchport';
import { Provider } from './provider';
import { Vehicle } from './vehicle';
import { Traveler } from './traveler';
export class Trip implements Deserializable {
   id: number;
   travelers: Traveler[];
   provider: Provider;
   vehicle: Vehicle;
   launchport: Launchport;
   title: string;
   destination: string;
   cost: number;
   tripLength: number;
   tripDate: Date = new Date();
   photoURL: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    this.provider = new Provider().deserialize(input.provider);
    this.vehicle = new Vehicle().deserialize(input.vehicle);
    this.launchport = new Launchport().deserialize(input.launchport);
    this.travelers = input.travelers.map(( (traveler: Traveler) => {
      return new Traveler().deserialize(traveler);
    }));
    return this;
  }

}

