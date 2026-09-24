import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { combineLatest, map, Observable, of } from 'rxjs';
import { Country, RESTCountry } from '../interfaces/countrys.interface';
import { CountryMapper } from '../mappers/countries.mapper';
import { CountryI } from '../interfaces/country.interface';


@Injectable({providedIn: 'root'})
export class CountryService {

  http = inject(HttpClient);

  private api = "https://api.restcountries.com/countries/v5";
  private key = "Bearer rc_live_09e5ace6a36a44e18d4b03532de44d85";

  private _regions = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania'
  ];

  get regions(): string[] {
    return [...this._regions];
  }

  getCountriesByRegion( region: string): Observable<CountryI[]>{
    if(!region) return of([]);

    const url = `${ this.api }?region=${ region }&response_fields=codes.alpha_2,names.common,borders&limit=100`;

    return this.http.get<RESTCountry>(url,{
      headers: {
        Authorization:  `${ this.key }`
      }
    })
    .pipe(
      map((response:RESTCountry) => {
        return CountryMapper.mapCountryArrayToCountryArray(response.data.objects);
      }),
    );
  }


  getCountryByAlphaCode(code: string): Observable<CountryI>{
    const url = `${ this.api }/code?q=${ code }&response_fields=codes.alpha_2,names.common,borders`
    return this.http.get<RESTCountry>(url, {
      headers: {
        Authorization:  `${ this.key }`
      }
    })
    .pipe(
      map((response: RESTCountry) => {
        return CountryMapper.mapCountryToCountry( response.data.objects[0] )
      }),
    );
  }


  getCountryBorderByCodes( borders: string[]): Observable<CountryI[]>{
    // TODO POR HACER
    if(!borders || borders.length === 0) return of([]);

    const countriesRequests: Observable<CountryI>[] = [];

    borders.forEach(code => {
      const request = this.getCountryByAlphaCode(code);
      countriesRequests.push(request);
    })

    return combineLatest( countriesRequests );

  }



}
