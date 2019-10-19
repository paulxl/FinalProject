import { Deserializable } from './../interfaces/deserializable';
export class Launchport implements Deserializable {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
