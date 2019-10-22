export class CompanyDTO {
    username: string;
    password: string;
    email: string;
    name: string;
    logoUrl: string;
    webUrl: string;

    constructor(
        username?: string,
        password?: string,
        email?: string,
        name?: string,
        logoUrl?: string,
        webUrl?: string
    ){
        this.username = username ,
        this.password = password,
        this.email = email,
        this.name = name,
        this.logoUrl = logoUrl,
        this.webUrl = webUrl
    }
}
