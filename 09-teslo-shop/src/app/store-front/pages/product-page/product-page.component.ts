import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@products/services/products.service';
@Component({
  selector: 'app-product-page',
  imports: [],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent {

  activatedRoute  = inject(ActivatedRoute);
  productsService = inject(ProductsService);

  productIdSlug:string = this.activatedRoute.snapshot.params['idSlug'];
  // productIdSlug = this.activatedRoute.snapshot.paramMap.get('idSlug');

  productInfo = rxResource({
    params: () => ({
      id:this.productIdSlug
    }),
    stream: ({ params }) => {
      return this.productsService.getProductByIdOrSlug( params.id )
    }
  })

  //productIdSlug
  //rxResource
  //servicio generar otro metodo getProductByIdORSlug
  //getProductByIdOrSlug(idSlug: string):Observable<Product>

}
