import { Companies } from 'src/app/models/companies';
import { Vehicle } from './vehicle';
// import { Deserializable } from './../interfaces/deserializable';
// import { Provider } from './provider';

export class Vehicle {
id: number;
companies: Companies;
name: string;
type: string;
description: string;
range: number;
capactity: number;
photoURL: string;

constructor(
id?: number,
companies?: Companies,
name?: string,
type?: string,
description?: string,
range?: number,
capactity?: number,
photoURL?: string,
) {
  this.id = id;
  this.companies = companies;
  this.name = name;
  this.type = type;
  this.description = description;
  this.range = range;
  this.capactity = capactity;
  this.photoURL = photoURL;
}
}

// export class Vehicle implements Deserializable {
// id: number;
// provider: Provider;
// name: string;
// type: string;
// description: string;
// range: number;
// capactity: number;
// photoURL: string;

// deserialize(input: any): this {
//   Object.assign(this, input);
//   this.provider = new Provider().deserialize(input.provider);
//   return this;
//   }
// }
