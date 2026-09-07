import { Component, computed, input } from '@angular/core';
import { CountryItems } from '../../../interfaces/country.interface';
import { CurrencyPipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'country-information-component',
  imports: [DecimalPipe],
  templateUrl: './country-information.component.html',
})
export class CountryInformationComponent {

  country = input.required<CountryItems>();

  currentYear = computed(() => {
    return new Date().getFullYear();
  })
}
