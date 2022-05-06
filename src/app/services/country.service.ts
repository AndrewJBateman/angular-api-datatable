import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';

import {
  CountryListInterface,
  CountryDetailInterface,
  Country,
} from '../interfaces/country.interface';

const apiUrl = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private httpClient: HttpClient) {}

  fetchCountryList = (url: string) => {
    return this.httpClient.get<CountryDetailInterface[]>(`${apiUrl}/${url}`).pipe(
      tap((data) => console.log('data', data)),
      take(1),
      catchError((error) => {
        return throwError(() => console.log('Countries not found', error));
      })
    );
  };
}
