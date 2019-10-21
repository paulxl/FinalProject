import { UserService } from './../services/user.service';
export class User {
  id: number;
  username: string;
  password: string;
  email: string;
  enabled: boolean;
  role: string;
  value: any;

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
