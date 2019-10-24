import { environment } from './../../environments/environment';
import { TravelerDTO } from 'src/app/models/traveler-dto';
import { User } from './../models/user';
import { CompanyDTO } from './../models/company-dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'inSessionUser';
  USER_NAME_SESSION_ATTRIBUTE_ID = 'inSessionUserId';
  USER_NAME_SESSION_ATTRIBUTE_ROLE = 'inSessionRole';

  private baseUrl = environment.baseUrl;
  private authUrl = this.baseUrl + 'auth';
  public username: string;
  public password: string;
  public role: string;

  constructor(
    private http: HttpClient,
    private userServ: UserService
  ) {}

  authenticationService(username: string, password: string) {
    console.log(username + ':' + password);
    const basicAuthToken = this.createBasicAuthToken(username, password);
    console.log(basicAuthToken);
    sessionStorage.setItem('credentials', basicAuthToken);

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
          console.log('In tap');

          this.registerSuccessfulLogin(username).subscribe(
            user => {
              console.log('Current User ', user);
              const currentUser: User = user;
              sessionStorage.setItem(
                this.USER_NAME_SESSION_ATTRIBUTE_ROLE,
                currentUser.role
              );
              sessionStorage.setItem(
                this.USER_NAME_SESSION_ATTRIBUTE_ID,
                '' + currentUser.id
              );
            },
            bad => {
              console.error('Error retrieving logged in user');
              console.error(bad);
            }
          );
        })
      );
  }

  createBasicAuthToken(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ':' + password);
  }

  getCredentials(): string {
    // return 'Basic ' + window.btoa(this.username + ':' + this.password);
    // or
    const cred = sessionStorage.getItem('credentials');
    console.log(`AuthService.getCredentials(): returning [${cred}]`);
    return cred;
  }

  registerSuccessfulLogin(username) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    sessionStorage.setItem('credentials', this.getCredentials());
    console.log('In registerSuccessfulLogin()');
    const url = `${this.baseUrl}api/user/username/${username}`;
    console.log('Requesting ' + url);
    const options = this.httpOptions();
    console.log(options);


    return this.http.get<User>(url, options).pipe(
      tap(result => {
        console.log(`fetched User name=${username}`);
        console.log(result);
        return result;
      }),
      catchError((err: any) => {
        console.error(`registerSuccessfulLogin: Error: name=${username}`);
        console.error(err);
        return throwError(`registerSuccessfulLogin: Error: name=${username}`);
      })
    );
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_ROLE);
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_ID);
    sessionStorage.removeItem('credentials');
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
      return '';
    }
    return user;
  }

  getLoggedInUserId() {
    const id = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_ID);
    if (id === null) {
      return -1;
    }
    return Number.parseInt(id, 10);
  }

  registerTraveler(dto: TravelerDTO) {
    console.log('inside of register traveler method');
    // const url = this.baseUrl + 'api/traveler';
    const url = this.baseUrl + 'register/traveler';
    console.log('posting to ' + url);
    const httpOptions = this.httpOptionsNoAuth();
    console.log(httpOptions);

    // create request to register a new account
    return this.http.post(url, dto, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          'AuthService.registerTraveler(): error registering traveler.'
        );
      })
    );
  }

  registerCompany(dto: CompanyDTO) {
    // create request to register a new account
    const url = this.baseUrl + 'register/company';
    console.log('inside of register company method auth service');
    console.log('posting to ' + url);
    const httpOptions = this.httpOptionsNoAuth();
    console.log(httpOptions);

    return this.http.post(url, dto, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          'AuthService.registerCompany(): error registering company.'
        );
      })
    );
  }

  public isTraveler(): boolean {
    // console.log('isTraveler(): logged in: ' + this.isUserLoggedIn());
    // console.log('isTraveler(): role: ' + sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_ROLE));

    return this.isUserLoggedIn() && sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_ROLE) === 'traveler';
  }

  public isCompany(): boolean {
    return this.isUserLoggedIn() && sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_ROLE) === 'company';
  }

  private httpOptions() {
    const cred = this.getCredentials();
    // console.log('httpOptions(): cred: ' + cred);

    return {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: cred
      }
    };
  }

  private httpOptionsNoAuth() {
    return {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    };
  }
}
