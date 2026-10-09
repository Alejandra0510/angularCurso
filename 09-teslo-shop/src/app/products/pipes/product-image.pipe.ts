import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

const url_api = environment.urlApi;

@Pipe({
  name: 'productImage'
})

export class ProductImagePipe implements PipeTransform {

  transform(value: string | string[]): string {

    //arreglo > 1 : muestra primer elemento
    //string = string
    //value vacio muesta placeholder, image: ./assets/images/no-image.jpg
    if(typeof(value) === 'string'){
      return `${url_api}/files/product/${value}`;
    }

    const image = value.at(0);

    if(!image){
      return './assets/images/no-image.jpg'
    }

    return `${url_api}/files/product/${image}`

  }
}
