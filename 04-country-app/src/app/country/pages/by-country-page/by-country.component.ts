import { Component, inject, resource, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { firstValueFrom, of } from 'rxjs';

import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryList } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-country',
  imports: [SearchInputComponent, CountryList],
  templateUrl: './by-country.component.html'
})
export class ByCountryPageComponent {

  capitalService = inject(CountryService);
  query = signal('');

  // captialResource = resource({
  //   params: () => ({ query: this.query() }),
  //   loader: async({ params }) => {
  //     if(!params.query) return[];

  //     return await firstValueFrom(
  //       this.capitalService.searchByCountry( params.query )
  //     );
  //   },
  // });


  capitalResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if(!params.query) return of([]);
      return this.capitalService.searchByCountry(params.query)
    }
  });


}
