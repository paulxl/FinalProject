import { environment } from "./../../environments/environment";
import { TravelerDTO } from "src/app/models/traveler-dto";
import { User } from "./../models/user";
import { CompanyDTO } from "./../models/company-dto";
import { Companies } from "src/app/models/companies";
import { Traveler } from "./../models/traveler";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { UserService } from "src/app/services/user.service";
import { tap, map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  USER_NAME_SESSION_ATTRIBUTE_NAME = "inSessionUser";
  USER_NAME_SESSION_ATTRIBUTE_ROLE = "inSessionRole";

  private baseUrl = environment.baseUrl;
  private authUrl = this.baseUrl + "auth";
  public username: string;
  public password: string;
  public role: string;

  constructor(
    private http: HttpClient // , private userServ: UserService
  ) {}

  authenticationService(username: string, password: string) {
    console.log(username + ":" + password);
    const basicAuthToken = this.createBasicAuthToken(username, password);
    console.log(basicAuthToken);

    return this.http
      .get(this.authUrl, {
        headers: {
          Authorization: basicAuthToken
        }
      })
      .pipe(
        tap(res => {
          this.username = username;
          this.password = password;
          console.log("In tap");

          this.registerSuccessfulLogin(username).subscribe(
            user => {
              console.log("Current User ", user);
              const currentUser: User = user;
              sessionStorage.setItem(
                this.USER_NAME_SESSION_ATTRIBUTE_ROLE,
                currentUser.role
              );
            },
            bad => {
              console.error("Error retrieving logged in user");
              console.error(bad);
            }
          );
        })
      );
  }

  createBasicAuthToken(username: string, password: string) {
    return "Basic " + window.btoa(username + ":" + password);
  }

  getCredentials(): string {
    return "Basic " + window.btoa(this.username + ":" + this.password);
    // or
    // return sessionStorage.getItem('credentials');
  }

  registerSuccessfulLogin(username) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    sessionStorage.setItem("credentials", this.getCredentials());
    console.log("In registerSuccessfulLogin()");
    const url = `${this.baseUrl}api/user/username/${username}`;
    console.log("Requesting " + url);

    return this.http.get<User>(url, this.httpOptions()).pipe(
      tap(result => {
        console.log(`fetched User name=${username}`);
        console.log(result);
        return result;
      }),
      catchError((err: any) => {
        console.log(err);
        return throwError(
          "AuthService.registerSuccessfulLogin(): error logging in."
        );
      }
    ));
    // this.userServ.getUserByName(username).subscribe(
    //   user => {
    //     console.log("Current User ", user);
    //     const currentUser: User = user;
    //     sessionStorage.setItem(
    //       this.USER_NAME_SESSION_ATTRIBUTE_ROLE,
    //       currentUser.role
    //     );
    //   },
    //   err => {
    //     console.log("Error Getting user: ", err);
    //   }
    // );
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_ROLE);
    sessionStorage.removeItem("credentials");
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

  private httpOptions() {
    const cred = this.getCredentials();
    return {
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: cred
      }
    };
  }
}
