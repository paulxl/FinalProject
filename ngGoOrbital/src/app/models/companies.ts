export class Companies {
  id: number;
  userId: number;
  name: string;
  logoURL: string;
  webURL: string;

  constructor(
    id?: number,
    userId?: number,
    name?: string,
    logoURL?: string,
    webURL?: string
  ) {
    {
      this.id = id;
      this.userId = userId;
      this.name = name;
      this.logoURL = logoURL;
      this.webURL = webURL;
    }
  }
}
