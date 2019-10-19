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

  constructor({ id, name, latitude, longitude}: {id?:number; name?: string; latitude?: number; longitude?: number;}={})

  {
    this.id = id;
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
  }

}
