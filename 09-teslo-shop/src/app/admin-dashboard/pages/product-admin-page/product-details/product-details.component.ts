import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { FormUtils } from '@utils/form-utils';
import { Product } from '@products/interfaces/product.interface';
import { ProductCarouselComponent } from '@products/components/product-carousel/product-carousel.component';
import { ProductsService } from '@products/services/products.service';
import { FormErrorLabelComponent } from '@shared/components/form-error-label/form-error-label.component';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'product-details',
  imports: [ProductCarouselComponent, ReactiveFormsModule, FormErrorLabelComponent],
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent implements OnInit {
  product = input.required<Product>();

  fb = inject(FormBuilder);
  router = inject(Router);
  productService = inject(ProductsService);

  wasSave = signal(false);
  imagesTemp = signal<string[]>([]);
  imageFilesList: FileList|undefined = undefined;

  updateFilesTemp = computed(() => {
    const currenImages = [...this.product().images, ...this.imagesTemp()];
    return currenImages;
  });

  formProduct = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    slug: ['', [Validators.required, Validators.pattern(FormUtils.slugPattern)]],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    sizes: [['']],
    images: [[]],
    tags: [''],
    gender: ['men', [Validators.required, Validators.pattern(/men|wommen|kid|unixes/)]], //indica los valores nadamas a escoger
  });

  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  ngOnInit(): void {
    this.setFormValue(this.product())
  }

  setFormValue( formLike: Partial<Product>){
    // this.formProduct.patchValue(formLike as any);
    this.formProduct.reset(this.product() as any);
    this.formProduct.patchValue({ tags: formLike.tags?.join(",") });
  }

  onSizeClicked(size: string){
    const currentSizes = this.formProduct.value.sizes ?? [];

    if(currentSizes.includes(size)){
      currentSizes.splice(currentSizes.indexOf(size), 1);
    } else {
      currentSizes.push(size);
    }

    this.formProduct.patchValue({ sizes: currentSizes });
  }

  async onSubmit() {
    const isValid = this.formProduct.valid;
    this.formProduct.markAsTouched();

    if(!isValid)return;

    const formValue = this.formProduct.value;
    const productLike: Partial<Product> = {
      ...(formValue as any),
      tags:
        formValue.tags
        ?.toLocaleLowerCase()
        .split('.')
        .map(tag=> tag.trim() ?? []),
    };

    if(this.product().id === 'new'){
      //crea producto
      const product = await firstValueFrom(
        this.productService.createProduct(
          productLike,
          this.imageFilesList
        )
      );
      this.router.navigate(['/admin/products', product.id]);

    } else {
      await firstValueFrom(
        this.productService.updateProduct(
          this.product().id,
          productLike,
          this.imageFilesList
        )
      );
    }

    this.wasSave.set(true);
    setTimeout(() => {
      this.wasSave.set(false);
    }, 3000);

  }


  // imagenes
  onFilesChanged( event:Event ){
    const filesList = (event.target as HTMLInputElement).files;
    // información completa de la imagen, para guardarla en la bd
    this.imageFilesList = filesList ?? undefined;

    // crea url de la imagen para mostrar
    const urlImages = Array.from(filesList ?? [])
    .map(
      file => URL.createObjectURL(file)
    )
    this.imagesTemp.set(urlImages);

    // console.log(this.updateFilesTemp());
  }

}
