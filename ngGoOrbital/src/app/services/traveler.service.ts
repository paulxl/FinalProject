import { AuthService } from "src/app/services/auth.service";
import { Injectable } from "@angular/core";
import { MessageService } from "./message.service";
import { environment } from "src/environments/environment";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Traveler } from "../models/traveler";
import { tap, catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class TravelerService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private authService: AuthService
  ) {}
  private url = environment.baseUrl + "api/traveler";

  getTravelers(): Observable<Traveler[]> {
    return this.http.get<Traveler[]>(this.url, this.httpOptions()).pipe(
      tap(_ => this.log("fetched traveler")),
      catchError(this.handleError<Traveler[]>("getTravelers", []))
    );
  }

  /** GET Traveler by id. Return `undefined` when id not found */
  getTravelerNo404<Data>(id: number): Observable<Traveler> {
    const url = `${this.url}/?id=${id}`;
    return this.http.get<Traveler[]>(url).pipe(
      map(traveler => traveler[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} Traveler id=${id}`);
      }),
      catchError(this.handleError<Traveler>(`getTraveler id=${id}`))
    );
  }

  /** GET Traveler by id. Will 404 if id not found */
  getTraveler(id: number): Observable<Traveler> {
    const url = `${this.url}/${id}`;
    return this.http.get<Traveler>(url).pipe(
      tap(_ => this.log(`fetched Traveler id=${id}`)),
      catchError(this.handleError<Traveler>(`getTraveler id=${id}`))
    );
  }

  /* GET traveler whose name contains search term */
  searchTravelers(term: string): Observable<Traveler[]> {
    if (!term.trim()) {
      // if not search term, return empty Traveler array.
      return of([]);
    }
    return this.http.get<Traveler[]>(`${this.url}/?name=${term}`).pipe(
      tap(_ => this.log(`found traveler matching "${term}"`)),
      catchError(this.handleError<Traveler[]>("searchTravelers", []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Traveler to the server */
  addTraveler(traveler: Traveler): Observable<Traveler> {
    return this.http
      .post<Traveler>(this.url, traveler, this.httpOptions())
      .pipe(
        tap((newTraveler: Traveler) =>
          this.log(`added Traveler w/ id=${newTraveler.id}`)
        ),
        catchError(this.handleError<Traveler>("addTraveler"))
      );
  }

  /** DELETE: delete the Traveler from the server */
  deleteTraveler(traveler: Traveler | number): Observable<Traveler> {
    const id = typeof traveler === "number" ? traveler : traveler.id;
    const url = `${this.url}/${id}`;
    return this.http.delete<Traveler>(url, this.httpOptions()).pipe(
      tap(_ => this.log(`deleted Traveler id=${id}`)),
      catchError(this.handleError<Traveler>("deleteTraveler"))
    );
  }

  /** PUT: update the Traveler on the server */
  updateTraveler(traveler: Traveler): Observable<any> {
    return this.http.put(this.url, traveler, this.httpOptions()).pipe(
      tap(_ => this.log(`updated traveler id=${traveler.id}`)),
      catchError(this.handleError<any>("updateTraveler"))
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
  /** Log a travelerervice message with the MessageService */
  private log(message: string) {
    this.messageService.add(`TravelerService: ${message}`);
  }

  private httpOptions() {
    const cred = this.authService.getCredentials();
    return {
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: cred
      }
    };
  }
}
