import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { WeatherForecast } from './weather-forecast';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private productUrl = '/v1/weather/forecast';

  constructor(private http: HttpClient) { }

  getForecast(): Observable<WeatherForecast[]> {
    return this.http.get<WeatherForecast[]>(this.productUrl)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(WeatherService.handleError)
      );
  }

  private static handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
