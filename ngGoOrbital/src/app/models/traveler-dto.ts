export class TravelerDTO {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    photoUrl: string;

    constructor(
        username?: string,
        password?: string,
        email?: string,
        firstName?: string,
        lastName?: string,
        photoUrl?: string
    ) {
        this.username = username ,
        this.password = password,
        this.email = email,
        this.firstName = firstName,
        this.lastName = lastName,
        this.photoUrl = photoUrl;
    }
}
