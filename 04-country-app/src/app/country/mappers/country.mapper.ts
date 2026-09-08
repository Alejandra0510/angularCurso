import { isEmpty } from "rxjs";
import type { CountryItems } from "../interfaces/country.interface";
import type { Country } from "../interfaces/rest-contries.interfaces";

export class countryMapper {

  static mapRestCountryToCountry (restCountry: Country) : CountryItems {
    console.log(restCountry.capitals);
    return {
      cioc: restCountry.codes.cioc,
      emoji: restCountry.flag.emoji,
      urlSvg: restCountry.flag.url_svg,
      names: restCountry.names.translations['spa'].common ?? 'Sin traducción',
      capitals: restCountry.capitals?.length ? restCountry.capitals[0].name : 'Sin capital',
      population: restCountry.population,
      region: restCountry.region,
      subregion: restCountry.subregion,
      flag: restCountry.flag.url_png
    };
  }

  static mapRestCountryArrayToCountryArray(restCountries: Country[]): CountryItems[]{
    console.log({restCountries});
    // return restCountries.map( this.mapRestCountryToCountry )
    if (!Array.isArray(restCountries)) {
      return [];
    }
    return restCountries.map(country => this.mapRestCountryToCountry(country));
  }
}
