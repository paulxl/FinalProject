//import { Traveler } from './traveler';
// import { TravelerService } from './../services/traveler.service';
// import { Deserializable } from './../interfaces/deserializable';
// export class Traveler implements Deserializable {
//   id: number;
//   firstName: string;
//   lastName: string;
//   photoURL: string;
//   deserialize(input: any): this {
//     return Object.assign(this, input);
//   }

// }
export class Traveler {
  id: number;
  firstName: string;
  lastName: string;
  photoUrl: string;

  constructor(
    id?: number,
    firstName?: string,
    lastName?: string,
    photoUrl?: string
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.photoUrl = photoUrl;
  }
}
