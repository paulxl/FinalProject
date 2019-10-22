import { TravelerDTO } from "src/app/models/traveler-dto";
import { User } from "./../models/user";
import { CompanyDTO } from "./../models/company-dto";
import { Companies } from "src/app/models/companies";
import { Traveler } from "./../models/traveler";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { UserService } from "src/app/services/user.service";

import { map, catchError, tap } from "rxjs/operators";


@Injectable({
  providedIn: "root"
})
export class AuthService {
  USER_NAME_SESSION_ATTRIBUTE_NAME = "inSessionUser";
  USER_NAME_SESSION_ATTRIBUTE_ROLE = "inSessionRole";

  private baseUrl = "http://localhost:8085/";
  public username: string;
  public password: string;
  public role: string;

  constructor(private http: HttpClient, private userServ: UserService) { }
  authenticationService(username: string, password: string) {
    return this.http
      .get(`http://localhost:8085/auth`, {
        headers: {
          authorization: this.createBasicAuthToken(username, password)
        }
      })
      .pipe(
        map(res => {
          this.username = username;
          this.password = password;

          this.registerSuccessfulLogin(username);
        })
      );
  }

  createBasicAuthToken(username: string, password: string) {
    return "Basic " + window.btoa(username + ":" + password);
  }

  registerSuccessfulLogin(username) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    this.userServ.getUserByName(username).subscribe({
      next(user) {
        console.log("Current User ", user);
        const currentUser: User = user;
        sessionStorage.setItem(
          this.USER_NAME_SESSION_ATTRIBUTE_ROLE,
          currentUser.role
        );
      },
      error(msg) {
        console.log("Error Getting user: ", msg);
      }
    });
  }

  logout() {
    console.log("inside of auth service logout");

    sessionStorage.removeItem("inSessionUser");
    this.username = null;
    this.password = null;
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) {
      return false;
    } else {
      return true;
    }
  }

  getLoggedInUserName() {
    const user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) {
      return "";
    }
    return user;
  }

  //    login(username, password) {
  //     // Make credentials
  //     const credentials = this.generateBasicAuthCredentials(username, password);
  //     // Send credentials as Authorization header (this is spring security convention for basic auth)
  //     const httpOptions = {
  //       headers: new HttpHeaders({
  //         Authorization: `Basic ${credentials}`,
  //         "X-Requested-With": "XMLHttpRequest"
  //       })
  //     };

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
}
