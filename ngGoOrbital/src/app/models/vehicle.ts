import { Deserializable } from './../interfaces/deserializable';
import { Provider } from './provider';

export class Vehicle implements Deserializable {
id: number;
provider: Provider;
name: string;
type: string;
description: string;
range: number;
capactity: number;
photoURL: string;
deserialize(input: any): this {
  Object.assign(this, input);
  this.provider = new Provider().deserialize(input.provider);
  return this;
  }
}
