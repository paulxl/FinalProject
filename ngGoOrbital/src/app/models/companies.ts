import { User } from "src/app/models/user";
export class Companies {
  id: number;
  name: string;
  logoUrl: string;
  webUrl: string;
  user: User;

  constructor(id?: number, name?: string, logoUrl?: string, webUrl?: string, user?: User) {
    this.name = name;
    this.logoUrl = logoUrl;
    this.webUrl = webUrl;
    this.user = user;
    this.id = id;
  }
}
