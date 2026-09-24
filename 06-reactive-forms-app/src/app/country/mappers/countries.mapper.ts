import { CountryI } from "../interfaces/country.interface";
import { Country } from "../interfaces/countrys.interface";


export class CountryMapper {

  static mapCountryToCountry( restCountry: Country): CountryI {
    return{
      names: restCountry.names.common,
      codes: restCountry.codes.alpha_2,
      borders: restCountry.borders
    }
  }


  static mapCountryArrayToCountryArray( countries: Object): CountryI[]{
    // console.log(countries);
    if(!Array.isArray(countries)) return [];
    return countries.map((country => this.mapCountryToCountry( country )));
  }
}
