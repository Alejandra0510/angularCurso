import type { CountryItems } from "../interfaces/country.interface";
import type { Country } from "../interfaces/rest-contries.interfaces";

export class countryMapper {

  static mapRestCountryToCountry (restCountry: Country) : CountryItems {
    return {
      cioc: restCountry.codes.cioc,
      emoji: restCountry.flag.emoji,
      urlSvg: restCountry.flag.url_svg,
      names: restCountry.names.translations['spa'].common ?? 'Sin traducción',
      capitals: restCountry.capitals[0].name ?? 'Sin capital',
      population: restCountry.population
    };
  }

  static mapRestCountryArrayToCountryArray(restCountries: Country[]): CountryItems[]{
    // return restCountries.map( this.mapRestCountryToCountry )
    if (!Array.isArray(restCountries)) {
      return [];
    }
    return restCountries.map(country => this.mapRestCountryToCountry(country));
  }
}
