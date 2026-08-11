import { Component, input } from '@angular/core';
import { CountryItems } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'country-list',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './country-list.component.html',
})
export class CountryList {
  countries = input.required<CountryItems[]>();
}
