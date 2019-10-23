<<<<<<< HEAD
import { AuthService } from "src/app/services/auth.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MessageService } from "./message.service";
import { environment } from "src/environments/environment";
import { Observable, of } from "rxjs";
import { tap, catchError, map } from "rxjs/operators";
import { Companies } from "../models/companies";

@Injectable({
  providedIn: "root"
})
export class CompaniesService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private authServ: AuthService
  ) {}
  private url = environment.baseUrl + "api/companies";

  getCompany(): Observable<Companies[]> {
    return this.http.get<Companies[]>(this.url).pipe(
      tap(_ => this.log("fetched Companies")),
      catchError(this.handleError<Companies[]>("getCompanies", []))
    );
  }

  /** GET Company by id. Return `undefined` when id not found */
  getCompaniesNo404<Data>(id: number): Observable<Companies> {
    const url = `${this.url}/?id=${id}`;
    return this.http.get<Companies[]>(url).pipe(
      map(Companys => Companies[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} Companies id=${id}`);
      }),
      catchError(this.handleError<Companies>(`getCompanies id=${id}`))
    );
  }

  /** GET Provider by id. Will 404 if id not found */
  getCompanies(id: number): Observable<Companies> {
    const url = `${this.url}/${id}`;
    return this.http.get<Companies>(url).pipe(
      tap(_ => this.log(`fetched Companies id=${id}`)),
      catchError(this.handleError<Companies>(`getCompanies id=${id}`))
    );
  }
   /** GET Provider by id. Will 404 if id not found */
 
    getCompanyByUserId(id: number){
     const url = `${this.url}/user/${id}`;
    return this.http.get<Companies>(url).pipe(
      tap(_ => this.log(`fetched Companies userId=${id}`)),
      catchError(this.handleError<Companies>(`getCompanies UserId=${id}`))
    );
    }

  /* GET Providers whose name contains search term */
  searchCompanies(term: string): Observable<Companies[]> {
    if (!term.trim()) {
      // if not search term, return empty Company array.
      return of([]);
    }
    return this.http.get<Companies[]>(`${this.url}/?name=${term}`).pipe(
      tap(_ => this.log(`found Companies matching "${term}"`)),
      catchError(this.handleError<Companies[]>("searchCompanies", []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Company to the server */
  addCompanies(companies: Companies): Observable<Companies> {
    console.log("inside of add companies service method");

    console.log(companies);

    return this.http
      .post<Companies>(this.url, companies, this.httpOptions())
      .pipe(
        tap((newCompanies: Companies) =>
          this.log(`added Companies w/ id=${newCompanies.id}`)
        ),
        catchError(this.handleError<Companies>("addCompanies"))
      );
  }

  /** DELETE: delete the Provider from the server */
  deleteCompanies(companies: Companies | number): Observable<Companies> {
    const id = typeof companies === "number" ? companies : companies.id;
    const url = `${this.url}/${id}`;
    return this.http.delete<Companies>(url, this.httpOptions()).pipe(
      tap(_ => this.log(`deleted Companies id=${id}`)),
      catchError(this.handleError<Companies>("deleteCompanies"))
    );
  }

  /** PUT: update the Provider on the server */
  updateCompanies(companies: Companies): Observable<any> {
    return this.http.put(this.url, companies, this.httpOptions()).pipe(
      tap(_ => this.log(`updated Companies id=${companies.id}`)),
      catchError(this.handleError<any>("updateCompanies"))
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  /** Log a CompanyService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`CompanyService: ${message}`);
  }
  private httpOptions() {
    const cred = this.authServ.getCredentials();
    return {
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: cred
      }
    };
  }
}
=======
import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Companies } from '../models/companies';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private authServ: AuthService
  ) {}
  private url = environment.baseUrl + 'api/companies';

  getCompany(): Observable<Companies[]> {
    return this.http.get<Companies[]>(this.url).pipe(
      tap(_ => this.log('fetched Companies')),
      catchError(this.handleError<Companies[]>('getCompanies', []))
    );
  }

  /** GET Company by id. Return `undefined` when id not found */
  getCompaniesNo404<Data>(id: number): Observable<Companies> {
    const url = `${this.url}/?id=${id}`;
    return this.http.get<Companies[]>(url).pipe(
      map(Companys => Companies[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} Companies id=${id}`);
      }),
      catchError(this.handleError<Companies>(`getCompanies id=${id}`))
    );
  }

  /** GET Provider by id. Will 404 if id not found */
  getCompanies(id: number): Observable<Companies> {
    const url = `${this.url}/${id}`;
    return this.http.get<Companies>(url).pipe(
      tap(_ => this.log(`fetched Companies id=${id}`)),
      catchError(this.handleError<Companies>(`getCompanies id=${id}`))
    );
  }
   /** GET Provider by id. Will 404 if id not found */
 
    getCompanyByUserId(id: number){
     const url = `${this.url}/user/${id}`;
    return this.http.get<Companies>(url).pipe(
      tap(_ => this.log(`fetched Companies userId=${id}`)),
      catchError(this.handleError<Companies>(`getCompanies UserId=${id}`))
    );
    }

  /* GET Providers whose name contains search term */
  searchCompanies(term: string): Observable<Companies[]> {
    // if (!term.trim()) {
    //   // if not search term, return empty Company array.
    //   return of([]);
    // }
    return this.http.get<Companies[]>(`${this.url}/?name=${term}`).pipe(
      tap(_ => this.log(`found Companies matching "${term}"`)),
      catchError(this.handleError<Companies[]>('searchCompanies', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Company to the server */
  addCompanies(companies: Companies): Observable<Companies> {
    console.log('inside of add companies service method');

    console.log(companies);

    return this.http
      .post<Companies>(this.url, companies, this.httpOptions())
      .pipe(
        tap((newCompanies: Companies) =>
          this.log(`added Companies w/ id=${newCompanies.id}`)
        ),
        catchError(this.handleError<Companies>('addCompanies'))
      );
  }

  /** DELETE: delete the Provider from the server */
  deleteCompanies(companies: Companies | number): Observable<Companies> {
    const id = typeof companies === 'number' ? companies : companies.id;
    const url = `${this.url}/${id}`;
    return this.http.delete<Companies>(url, this.httpOptions()).pipe(
      tap(_ => this.log(`deleted Companies id=${id}`)),
      catchError(this.handleError<Companies>('deleteCompanies'))
    );
  }

  /** PUT: update the Provider on the server */
  updateCompanies(companies: Companies): Observable<any> {
    return this.http.put(this.url, companies, this.httpOptions()).pipe(
      tap(_ => this.log(`updated Companies id=${companies.id}`)),
      catchError(this.handleError<any>('updateCompanies'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  /** Log a CompanyService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`CompanyService: ${message}`);
  }
  private httpOptions() {
    const cred = this.authServ.getCredentials();
    return {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: cred
      }
    };
  }
}
>>>>>>> 1c22dabc0e29bda0bdd18b77eba412dcf653c7eb
