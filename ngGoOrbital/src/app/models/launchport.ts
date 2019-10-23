import { Trip } from './trip';

//import { Launchport } from './launchport';
// import { Deserializable } from './../interfaces/deserializable';
// export class Launchport implements Deserializable {
//   id: number;
//   name: string;
//   latitude: number;
//   longitude: number;
//   deserialize(input: any): this {
//     Object.assign(this, input);
//     return this;
//   }
// }


export class Launchport {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  trips: Trip[];

  constructor({ id, name, latitude, longitude, trips}: {id?:number; name?: string; latitude?: number; longitude?: number; trips?: Trip[]}={})

  {
    this.id = id;
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
    this.trips = trips;
  }

}
