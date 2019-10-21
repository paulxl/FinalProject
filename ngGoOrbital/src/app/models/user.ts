import { UserService } from './../services/user.service';
export class User {
  id: number;
  username: string;
  password: string;
  email: string;
  enabled: boolean;
  role: string;
  constructor(
    id?: number,
    username?: string,
    password?: string,
    email?: string,
    enabled?: boolean,
    role?: string,
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.enabled = enabled;
    this.role = role;
  }
}








// import { Deserializable } from './../interfaces/deserializable';
// export class User implements Deserializable {
//   id: number;
//   username: string;
//   password: string;
//   email: string;
//   enabled: boolean;
//   deserialize(input: any): this {
//     return Object.assign(this, input);
//   }


// }
