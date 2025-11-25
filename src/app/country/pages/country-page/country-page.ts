import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { find, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.html',
})
export class CountryPage {
  countryService = inject(CountryService);

  fb = inject(FormBuilder);

  regions = signal<string[]>(this.countryService.regions);

  countriesByRegion = signal<Country[]>([]);

  borders = signal<Country[]>([]);

  myForm = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });

  onFormChange = effect((onCleanUp) => {
    const regionSubscription = this.onRegionChanged();
    const countrySubscription = this.onCountryChanged();

    onCleanUp(() => {
      regionSubscription?.unsubscribe();
      countrySubscription?.unsubscribe();
    });
  });

  onRegionChanged() {
    return this.myForm
      .get('region')!
      .valueChanges.pipe(
        tap(() => {
          this.myForm.get('country')?.setValue('');
          this.myForm.get('border')?.setValue('');
          this.borders.set([]);
          this.countriesByRegion.set([]);
        }),
        switchMap((region) => this.countryService.getCountriesByRegion(region ?? ''))
      )

      .subscribe((countries) => {
        this.countriesByRegion.set(countries);
      });
  }

  onCountryChanged() {
    return this.myForm
      .get('country')!
      .valueChanges.pipe(
        tap(() => {
          this.myForm.get('border')?.setValue('');
          this.borders.set([]);
        }),
        map((countryCode) =>
          this.countriesByRegion().find((country) => country.cca3 === countryCode)
        ),
        switchMap((country) => this.countryService.getCountryBorderByCodes(country?.borders!))
      )
      .subscribe((borderCountries) => {
        this.borders.set(borderCountries);
      });
  }
}
