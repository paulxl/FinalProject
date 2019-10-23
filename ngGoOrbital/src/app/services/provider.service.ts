import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { Provider } from '../models/provider';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}
  private url = environment.serverURL + 'api/provider';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  getProviders(): Observable<Provider[]> {
    return this.http.get<Provider[]>(this.url).pipe(
      tap(_ => this.log('fetched Providers')),
      catchError(this.handleError<Provider[]>('getProviders', []))
    );
  }

//   /** GET Provider by id. Return `undefined` when id not found */
//   getProviderNo404<Data>(id: number): Observable<Provider> {
//     const url = `${this.url}/?id=${id}`;
//     return this.http.get<Provider[]>(url).pipe(
//       map(providers => providers[0]), // returns a {0|1} element array
//       tap(h => {
//         const outcome = h ? `fetched` : `did not find`;
//         this.log(`${outcome} Provider id=${id}`);
//       }),
//       catchError(this.handleError<Provider>(`getProvider id=${id}`))
//     );
//   }

//   /** GET Provider by id. Will 404 if id not found */
//   getProvider(id: number): Observable<Provider> {
//     const url = `${this.url}/${id}`;
//     return this.http.get<Provider>(url).pipe(
//       tap(_ => this.log(`fetched Provider id=${id}`)),
//       catchError(this.handleError<Provider>(`getProvider id=${id}`))
//     );
//   }

  /* GET Providers whose name contains search term */
  searchProviders(term: string): Observable<Provider[]> {
    if (!term.trim()) {
      // if not search term, return empty Provider array.
      return of([]);
    }
    return this.http.get<Provider[]>(`${this.url}/?name=${term}`).pipe(
      tap(_ => this.log(`found Providers matching "${term}"`)),
      catchError(this.handleError<Provider[]>('searchProviders', []))
    );
  }

//   //////// Save methods //////////

  /** POST: add a new Provider to the server */
  addProvider(provider: Provider): Observable<Provider> {
    return this.http.post<Provider>(this.url, provider, this.httpOptions).pipe(
      tap((newProvider: Provider) =>
        this.log(`added Provider w/ id=${newProvider.id}`)
      ),
      catchError(this.handleError<Provider>('addProvider'))
    );
  }

  /** DELETE: delete the Provider from the server */
  deleteProvider(provider: Provider | number): Observable<Provider> {
    const id = typeof provider === 'number' ? provider : provider.id;
    const url = `${this.url}/${id}`;
    return this.http.delete<Provider>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted Provider id=${id}`)),
      catchError(this.handleError<Provider>('deleteProvider'))
    );
  }

  /** PUT: update the Provider on the server */
  updateProvider(provider: Provider): Observable<any> {
    return this.http.put(this.url, provider, this.httpOptions).pipe(
      tap(_ => this.log(`updated Provider id=${provider.id}`)),
      catchError(this.handleError<any>('updateProvider'))
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
  /** Log a ProviderService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ProviderService: ${message}`);
  }
}
