import { User } from "src/app/models/user";
export class Companies {
  name: string;
  logoUrl: string;
  webUrl: string;
  user: User;

  constructor(name?: string, logoUrl?: string, webUrl?: string, user?: User) {
    this.name = name;
    this.logoUrl = logoUrl;
    this.webUrl = webUrl;
    this.user = user;
  }
}
