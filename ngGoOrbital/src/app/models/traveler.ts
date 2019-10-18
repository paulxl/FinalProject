import { Deserializable } from './../interfaces/deserializable';
export class Traveler implements Deserializable {
  id: number;
  firstName: string;
  lastName: string;
  photoURL: string;
  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
