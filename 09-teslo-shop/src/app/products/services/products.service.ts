import { HttpClient } from '@angular/common/http';
import { inject, Injectable, resource } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

import { Product, ProductsReponse } from '@products/interfaces/product.interface';
import { environment } from '../../../environments/environment';

const url_api = environment.urlApi;

interface optionsProducts {
  limit?:  number,
  offset?: number,
  gender?: string

}

@Injectable({providedIn: 'root'})
export class ProductsService {

  private http = inject(HttpClient);

  getProducts(options: optionsProducts): Observable<ProductsReponse>{

    const {limit = 9, offset= 0, gender =''} = options;

    return this.http.get<ProductsReponse>(`${url_api}/products`, {
      params: {
        limit,
        offset,
        gender
      }
    })
    .pipe(
      tap((result) => console.log(result))
    )
  }


  getProductByIdOrSlug(idSlug: string): Observable<Product>{
    return this.http.get<Product>(`${url_api}/products/${idSlug}`)
  }

}
