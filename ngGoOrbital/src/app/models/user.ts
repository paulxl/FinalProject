import { UserService } from './../services/user.service';
import { Deserializable } from './../interfaces/deserializable';
export class User implements Deserializable {
  id: number;
  username: string;
  password: string;
  email: string;
  enabled: boolean;
  deserialize(input: any): this {
    return Object.assign(this, input);
  }


}
