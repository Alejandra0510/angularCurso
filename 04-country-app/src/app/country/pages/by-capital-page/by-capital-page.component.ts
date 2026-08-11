import { Component, inject, resource, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryList } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';


@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryList],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  countryService = inject(CountryService);
  query = signal('');

  countryResource = resource({
    params: () => ({query: this.query()}),
    loader: async({ params }) => {

      if(!params.query) return[];

      // return this.countryService.searchByCapital( params.query )
      return await firstValueFrom(
        this.countryService.searchByCapital(params.query)
      );
    },
  });

  // isLoading = signal(false);
  // isError   = signal<string|null>(null);
  // countries = signal<CountryItems[]>([]);

  // onSearchEnter( query: string ) {

  //   if( this.isLoading()) return;

  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.countryService.searchByCapital(query)
  //   //manejo de excepciones
  //   .subscribe({
  //     next: (response: CountryItems[]) => {
  //       this.isLoading.set(false);
  //       if(response.length > 0){
  //         this.countries.set(response);
  //       } else {
  //         this.countries.set([]);
  //         this.isError.set(`No se encontró un país con esa capital: ${ query }`);
  //       }
  //     },
  //     error: (err) => {
  //       this.isLoading.set(false);
  //       this.countries.set([]);
  //       this.isError.set(`No se encontró un país con esa capital: ${ err }`);
  //     },
  //   })
  // }

}
