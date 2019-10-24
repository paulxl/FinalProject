import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { TravelerTrip } from '../models/traveler-trip';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TravelerTripService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private authServ: AuthService
  ) {}
  private url = environment.baseUrl + 'api/travelerTrip';

  /** POST: add a new trip to the server */
  addTrip(trip: TravelerTrip): Observable<TravelerTrip> {
    return this.http.post<TravelerTrip>(this.url, trip, this.httpOptions()).pipe(
      tap(
        (newTrip: TravelerTrip) => {
          this.log(`added traveler trip w/ id=${newTrip.id}`);
          console.log(newTrip);

        }
        ),
      catchError(
        this.handleError<TravelerTrip>('addTrip')
        )
    );
  }

  deleteTravelerTrip(tTrip: TravelerTrip | number): Observable<TravelerTrip> {
    const id = typeof tTrip === 'number' ? tTrip : tTrip.id;
    const url = `${this.url}/${id}`;
    return this.http.delete<TravelerTrip>(url, this.httpOptions()).pipe(
      tap(_ => this.log(`deleted traveler trip id=${id}`)
      ),
      catchError(this.handleError<TravelerTrip>('deleteTrip'))
    );
  }


  /** PUT: update the trip on the server */
  updateTravelerTrip(trip: TravelerTrip): Observable<any> {
    return this.http.put(`${this.url}/${trip.id}`, trip, this.httpOptions()).pipe(
      tap(_ => this.log(`updated trip id=${trip.id}`)),
      catchError(this.handleError<any>('updateTrip'))
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
  /** Log a TripService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`TripService: ${message}`);
  }

  private httpOptions() {
    const cred = this.authServ.getCredentials();
    console.log('TripService.httpOptions(): ' + cred);
    return {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: cred
      }
    };
  }

}
