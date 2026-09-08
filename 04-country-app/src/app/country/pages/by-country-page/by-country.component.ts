import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { firstValueFrom, of } from 'rxjs';

import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryList } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country',
  imports: [SearchInputComponent, CountryList],
  templateUrl: './by-country.component.html'
})
export class ByCountryPageComponent {

  capitalService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute)
  router         = inject(Router);

  queryParams = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = linkedSignal(() => this.queryParams);


  capitalResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if(!params.query) return of([]);

      this.router.navigate(['country/by-country'], {
        queryParams: {
          query: params.query
        }
      })
      return this.capitalService.searchByCountry(params.query)
    }
  });


}
