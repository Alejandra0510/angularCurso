import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-contries.interfaces';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CountryItems } from '../interfaces/country.interface';
import { countryMapper } from '../mappers/country.mapper';

const url_api = 'https://api.restcountries.com/countries/v5';
const key_api = 'rc_live_09e5ace6a36a44e18d4b03532de44d85';

@Injectable({
  providedIn: 'root',
})

export class CountryService {
  private http = inject(HttpClient);

  searchByCapital( query: string ): Observable<CountryItems[]>{
    query = query.toLowerCase();

    return this.http.get<RESTCountry>(`${ url_api }/capitals`, {
      headers: {
        Authorization:  `Bearer ${ key_api }`
      },
      params: {
        q: query
      }
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
      catchError(error => {
        console.log("Error fetching: ", error);
        return throwError(() => new Error("No se pudo obtener paises con dicha información"));
      })
    );
  }


  //Tarea
  searchByCountry( query: string ){
    query = query.toLowerCase();

    return this.http.get<RESTCountry>(`${ url_api }/names.common/${query}`, {
      headers: {
        Authorization:  `Bearer ${ key_api }`
      }
    })
    .pipe(
      map((response: RESTCountry) => {
        // console.log("respuesta completa: ", response);
        if (response && response.data && response.data.objects && response.data.objects.length > 0) {
          // Aplicar el mapper para transformar Country[] a CountryItems[]
          return countryMapper.mapRestCountryArrayToCountryArray(response.data.objects);
        } else {
          // console.error("No se pudo obtener paises con dicha información");
          throw new Error('No se pudo obtener la ciudad con dicha información');
        }
      }),
      catchError(error => {
        console.log("Error fetching: ", error);
        return throwError(() => new Error("No se pudo obtener la ciudad con dicha información"));
      })
    );
  }


}

