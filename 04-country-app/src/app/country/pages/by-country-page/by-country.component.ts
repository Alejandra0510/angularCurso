import { Component } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryList } from "../../components/country-list/country-list.component";

@Component({
  selector: 'app-by-country',
  imports: [SearchInputComponent, CountryList],
  templateUrl: './by-country.component.html'
})
export class ByCountryPageComponent {}
