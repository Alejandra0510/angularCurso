import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { JsonPipe } from '@angular/common';
import { filter, switchMap, tap } from 'rxjs';
import { CountryI } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-page',
  imports: [ ReactiveFormsModule, JsonPipe ],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {

  fb = inject(FormBuilder);
  cs = inject(CountryService);

  regions = signal(this.cs.regions);
  countries_by_region = signal<CountryI[]>([]);
  borders = signal<CountryI[]>([]);

  myForm = this.fb.group({
    region:  ['', Validators.required],
    country: ['', Validators.required],
    border:  ['', Validators.required],
  });


  onFormChange = effect((onCleanUp) => {
    const regionSubscription = this.onRegionChanged();
    const countrySubscription = this.onCountryChanged();

    onCleanUp(() => {
      regionSubscription.unsubscribe();
      countrySubscription.unsubscribe();
    });

  });


  onRegionChanged(){
    return this.myForm.get('region')!.valueChanges
    .pipe(
      tap(() => this.myForm.get('country')!.setValue('')),
      tap(() => this.myForm.get('border')!.setValue('')),
      tap(() => {
        this.borders.set([]);
        this.countries_by_region.set([])
      }),
      switchMap( region => this.cs.getCountriesByRegion( region ?? ''))
    )
    .subscribe( countries => {
      // console.log({countries});
      this.countries_by_region.set(countries);
    });
  }


  onCountryChanged(){
    return this.myForm.get('country')!.valueChanges
    .pipe(
      tap(() => this.myForm.get('border')!.setValue('')),
      filter(value => value!.length > 0),
      switchMap((alphaCode) => this.cs.getCountryByAlphaCode(alphaCode ?? '')),
      switchMap(country => this.cs.getCountryBorderByCodes(country.borders))
    )
    .subscribe( borders => {
        // console.log({ countryBorder: borders });
      this.borders.set(borders);

      const borderControl = this.myForm.get('border');

      if (borders.length === 0) {
        // No hay fronteras → no es obligatorio
        borderControl?.clearValidators();
      } else {
        // Hay fronteras → sí es obligatorio
        borderControl?.setValidators([Validators.required]);
      }

      borderControl?.updateValueAndValidity();
    })
  }




}
