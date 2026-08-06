import { Component } from '@angular/core';
import { CountryList } from "../../components/country-list/country-list.component";

@Component({
  selector: 'app-by-region-page',
  imports: [CountryList],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {}
