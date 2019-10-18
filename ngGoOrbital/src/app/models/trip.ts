import { Launchport } from './launchport';
import { Provider } from "./provider";
import { Vehicle } from './vehicle';
export class Trip {
  id: number;
  provider: Provider;
  vehicle: Vehicle;
  launchport: Launchport;
  title: string;
  destination: string;
  cost: number;
  tripLength: number;
  tripDate: Date = new Date();
  photoURL: string;

}
