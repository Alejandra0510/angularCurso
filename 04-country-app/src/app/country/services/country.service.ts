import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-contries.interfaces';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { CountryItems } from '../interfaces/country.interface';
import { countryMapper } from '../mappers/country.mapper';

const url_api = 'https://api.restcountries.com/countries/v5';
const key_api = 'rc_live_09e5ace6a36a44e18d4b03532de44d85';

@Injectable({
  providedIn: 'root',
})

export class CountryService {
  private http = inject(HttpClient);
  private queryCache = new Map<string, CountryItems[]>();
  private queryCacheCountry = new Map<string, CountryItems[]>();

  searchByCapital( query: string ): Observable<CountryItems[]>{
    query = query.toLowerCase();

    if(this.queryCache.has(query)){
      return of(this.queryCache.get(query) ?? []);
    }

    return this.http.get<RESTCountry>(`${ url_api }/capitals?q=${query}`, {
      headers: {
        Authorization:  `Bearer ${ key_api }`
      },
    })
    .pipe(
      map((response: RESTCountry) => {
        // console.log("respuesta completa: ", response);
        if (response && response.data && response.data.objects && response.data.objects.length > 0) {
          // Aplicar el mapper para transformar Country[] a CountryItems[]
          return countryMapper.mapRestCountryArrayToCountryArray(response.data.objects);
        } else {
          // console.error("No se pudo obtener paises con dicha información");
          throw new Error('No se pudo obtener paises con dicha información');
        }
      }),
      tap((countries) => this.queryCache.set(query, countries)),
      catchError(error => {
        console.log("Error fetching: ", error);
        return throwError(() => new Error("No se pudo obtener paises con dicha información"));
      })
    );
  }


  //Tarea
  searchByCountry( query: string ){
    query = query.toLowerCase();

    if(this.queryCacheCountry.has(query)){
      return of(this.queryCacheCountry.get(query) ?? []);
    }

    console.log(`Llegando al servidor por ${ query }`);

    return this.http.get<RESTCountry>(`${ url_api }/names.common?q=${query}`, {
      headers: {
        Authorization:  `Bearer ${ key_api }`
      }
    })
    .pipe(
      map((response: RESTCountry) => {
        delay(2000)
        // console.log("respuesta completa: ", response);
        if (response && response.data && response.data.objects && response.data.objects.length > 0) {
          // Aplicar el mapper para transformar Country[] a CountryItems[]
          return countryMapper.mapRestCountryArrayToCountryArray(response.data.objects);
        } else {
          // console.error("No se pudo obtener paises con dicha información");
          throw new Error('No se pudo obtener la ciudad con dicha información');
        }
      }),
      tap((countries) => this.queryCacheCountry.set(query, countries)),
      catchError(error => {
        console.log("Error fetching: ", error);
        return throwError(() => new Error("No se pudo obtener la ciudad con dicha información"));
      })
    );
  }


    searchCountryByAlphaCode( code: string ){

    return this.http.get<RESTCountry>(`${ url_api }/code?q=${code}`, {
      headers: {
        Authorization:  `Bearer ${ key_api }`
      }
    })
    .pipe(
      map((response: RESTCountry) => {
        // console.log("respuesta completa: ", response);
        if (response && response.data && response.data.objects && response.data.objects.length > 0) {
          return countryMapper.mapRestCountryToCountry(response.data.objects[0]);
        } else {
          throw new Error(`No se pudo obtener la información con este código, ${code}`);
        }
      }),
      catchError(error => {
        return throwError(() => new Error(`No se pudo obtener países con este código, ${code}`));
      })
    );
  }
}

