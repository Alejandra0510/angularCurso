import { Component, inject, linkedSignal, signal } from '@angular/core';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

import { CountryService } from '../../services/country.service';
import { Region } from '../../interfaces/region.type';
import { CountryList } from "../../components/country-list/country-list.component";
import { ActivatedRoute, Router } from '@angular/router';

function validateQueryParam( queryParam: string): Region{
  queryParam = queryParam.toLocaleLowerCase();

  const validRegions: Record<string, Region> = {
    africa: 'Africa',
    americas: 'Americas',
    asia: 'Asia',
    europe: 'Europe',
    oceania: 'Oceania',
    antarctic: 'Antarctic'
  }

  return validRegions[queryParam] ?? 'Americas';
}

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  imports: [CountryList],
})


export class ByRegionPageComponent {

  regionService  = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);
  router         = inject(Router);

  queryParams = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';

  region_val = linkedSignal<Region>(() => validateQueryParam(this.queryParams));

  //Properties
  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];


  regionResource = rxResource({
    params: () => ({ query: this.region_val() }),
    stream: ({ params }) => {
      if(!params.query) return of([]);

      this.router.navigate(['country/by-region'], {
        queryParams: {
          region: params.query
        }
      })

      return this.regionService.searchByRegion(params.query);
    }
  });

  getInfoByRegion = (region: Region) => {
    this.region_val.set(region);
  }



}
