import { Component, inject, resource, signal } from '@angular/core';
import {rxResource} from '@angular/core/rxjs-interop';
import { firstValueFrom, of } from 'rxjs';

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


  //Trabajarlo con OBservable
  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if(!params.query) return of([]);
      return this.countryService.searchByCapital(params.query)
    }
  });

}

