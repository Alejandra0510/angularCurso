import { HttpClient } from '@angular/common/http';
import { inject, Injectable, resource } from '@angular/core';
import { count, delay, map, Observable, of, tap } from 'rxjs';

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
  private productsCache = new Map<string, ProductsReponse>();
  private productCache  = new Map<string, Product>();

  getProducts(options: optionsProducts): Observable<ProductsReponse>{

    const {limit = 9, offset= 0, gender = ''} = options;

    const key = `${limit}-${offset}-${gender}`;
    if(this.productsCache.has(key)){
      return of(this.productsCache.get(key)!);
    }

    return this.http.get<ProductsReponse>(`${url_api}/products`, {
      params: {
        limit,
        offset,
        gender
      }
    })
    .pipe(
      tap((result) => console.log(result)),
      tap((result) => this.productsCache.set(key, result))
    )
  }


  getProductByIdOrSlug(idSlug: string): Observable<Product>{

    if(this.productCache.has(idSlug)){
      return of(this.productCache.get(idSlug)!);
    }

    return this.http.get<Product>(`${url_api}/products/${idSlug}`)
    .pipe(
      tap((result) => this.productCache.set(idSlug, result))
    )
  }


  getProductById(id: string): Observable<Product>{
    if(this.productCache.has(id)){
      return of(this.productCache.get(id)!);
    }

    return this.http.get<Product>(`${url_api}/products/${id}`)
    .pipe(
      tap((result) => this.productCache.set(id, result))
    )
  }

}
