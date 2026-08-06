import { Component } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryList } from "../../components/country-list/country-list.component";

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryList],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  onSearchEnter( value: string ){
    console.log({value});
  }

}
