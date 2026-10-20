import { HttpClient } from '@angular/common/http';
import { inject, Injectable, resource } from '@angular/core';
import { count, delay, forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';

import { Gender, Product, ProductsReponse } from '@products/interfaces/product.interface';
import { environment } from '../../../environments/environment';
import { User } from '@auth/interfaces/user.interface';

const url_api = environment.urlApi;
const empty_product:Product = {
  id: 'new',
  title: '',
  price: 0,
  description: '',
  slug: '',
  stock: 0,
  sizes: [],
  gender: Gender.Women,
  tags: [],
  images: [],
  user: {} as User
};

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
    if(id === 'new'){
      return of(empty_product);
    }

    if(this.productCache.has(id)){
      return of(this.productCache.get(id)!);
    }

    return this.http.get<Product>(`${url_api}/products/${id}`)
    .pipe(
      tap((result) => this.productCache.set(id, result))
    )
  }


  updateProduct( id: string, productLike: Partial<Product>, imageFileList?: FileList):Observable<Product>{

    const currentImages = productLike.images ?? [];

    // 1. cargar imagenes
    return this.uploadImages(imageFileList)
      .pipe(
        map(imagesNames =>({
          ...productLike,
          images: [...currentImages, ...imagesNames]
        })),
        // switchMap = recibe la respuesta de un observable anterior y emite un nuevo observable
        switchMap((updatedProduct) => {
          return this.http.patch<Product>(`${url_api}/products/${id}`, updatedProduct)
        }),
        tap((product) => this.updateProductCache(product))
      );

    // return this.http.patch<Product>(`${url_api}/products/${id}`, productLike)
    // .pipe(
    //   tap((product) => this.updateProductCache(product))
    // );
  }

  createProduct(productLike:Partial<Product>, imageFileList?: FileList):Observable<Product>{

    return this.uploadImages(imageFileList)
      .pipe(
        map(imagesNames => ({
          ...productLike,
          images: [...imagesNames]
        })),
        switchMap((insertProduct) => {
          console.log(insertProduct);
          return this.http.post<Product>(`${url_api}/products`, insertProduct)
        }),
        tap((product) => this.updateProductCache(product))
      )
    // return this.http.post<Product>(`${url_api}/products`, productLike)
    // .pipe(
    //   tap((product) => this.updateProductCache(product))
    // );
  }

  updateProductCache(product: Product){
    const productId = product.id;

    //actualizar el cache de product
    this.productCache.set(productId, product);

    //actualizar el cache de products
    this.productsCache.forEach(result => {
      result.products = result.products.map((currentProduct) => {
        return currentProduct.id === productId ? product: currentProduct;
      });
    });

    console.log("Cache actualizado");
  }


  uploadImages( images?:FileList):Observable<string[]>{
    if(!images) return of([]);

    const upLoadObservables = Array.from(images)
      .map((imageFile) => this.uploadImage(imageFile)
    );

    //espera a que se manden todos los observables,
    //si llegan a fallar manda la excepción
    return forkJoin(upLoadObservables)
    .pipe(
      tap((imageName) => console.log({imageName}))
    );

  }

  uploadImage( image:File):Observable<string>{

    const formData = new FormData();
    formData.append('file', image);

    return this.http.post<{fileName:string}>(`${url_api}/files/product`, formData)
    .pipe(
      map((resp) => resp.fileName)
    )
  }

}
