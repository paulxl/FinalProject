import { TravelerDTO } from "src/app/models/traveler-dto";
import { User } from "./../models/user";
import { CompanyDTO } from "./../models/company-dto";
import { Companies } from "src/app/models/companies";
import { Traveler } from "./../models/traveler";
import { catchError, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private baseUrl = "http://localhost:8085/";

  constructor(private http: HttpClient) {}

  login(username, password) {
    // Make credentials
    const credentials = this.generateBasicAuthCredentials(username, password);
    // Send credentials as Authorization header (this is spring security convention for basic auth)
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        "X-Requested-With": "XMLHttpRequest"
      })
    };

    // create request to authenticate credentials
    return this.http.get(this.baseUrl + "login", httpOptions).pipe(
      tap(res => {
        localStorage.setItem("credentials", credentials);
        return res;
      }),
      catchError((err: any) => {
        console.log(err);
        return throwError("AuthService.login(): Error logging in.");
      })
    );
  }

  register(user) {
    // create request to register a new account
    console.log(user);

    return this.http.post(this.baseUrl + "register", user).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError("AuthService.register(): error registering user.");
      })
    );
  }

  registerTraveler(dto: TravelerDTO) {
    console.log("inside of register traveler method");

    // create request to register a new account
    return this.http.post(this.baseUrl + "register/traveler", dto).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          "AuthService.registerTraveler(): error registering traveler."
        );
      })
    );
  }

  registerCompany(dto: CompanyDTO) {
    // create request to register a new account
    console.log("inside of register company method auth service");

    return this.http.post(this.baseUrl + "register/company", dto).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          "AuthService.registerCompany(): error registering company."
        );
      })
    );
  }

  logout() {
    localStorage.removeItem("credentials");
  }

  checkLogin() {
    if (localStorage.getItem("credentials")) {
      return true;
    }
    return false;
  }

  generateBasicAuthCredentials(username, password) {
    return btoa(`${username}:${password}`);
  }

  getCredentials() {
    return localStorage.getItem("credentials");
  }
}
