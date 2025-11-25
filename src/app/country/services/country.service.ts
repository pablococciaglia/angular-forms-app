import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);
  private baseUrl = 'https://restcountries.com/v3.1';
  private _regions = [
    'Africa',
    'Americas',
    'Antarctic',
    'Asia',
    'Europe',
    'North America',
    'Oceania',
    'South America',
  ];

  get regions(): string[] {
    return [...this._regions];
  }

  getCountriesByRegion(region: string): Observable<Country[]> {
    if (!region) {
      return of([]);
    }
    const url = `${this.baseUrl}/region/${region}?fields=name,borders,cca3`;
    return this.http.get<Country[]>(url);
  }

  getCountryByAlphaCode(alphaCode: string): Observable<Country> {
    const url = `${this.baseUrl}/alpha/${alphaCode}?fields=name,borders,cca3`;
    return this.http.get<Country>(url);
  }

  getCountryBorderByCodes(borders: string[]) {
    if (!borders || borders.length === 0) return of([]);
    const countriesRequest: Observable<Country>[] = [];

    borders.forEach((code) => {
      const request = this.getCountryByAlphaCode(code);
      countriesRequest.push(request);
    });

    return combineLatest(countriesRequest);
  }
}
