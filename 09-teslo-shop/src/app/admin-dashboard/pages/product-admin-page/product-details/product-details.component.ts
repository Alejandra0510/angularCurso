import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Product } from '@products/interfaces/product.interface';
import { ProductCarouselComponent } from '@products/components/product-carousel/product-carousel.component';
import { FormUtils } from '@utils/form-utils';
import { FormErrorLabelComponent } from '@shared/components/form-error-label/form-error-label.component';


@Component({
  selector: 'product-details',
  imports: [ProductCarouselComponent, ReactiveFormsModule, FormErrorLabelComponent],
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent implements OnInit {
  fb = inject(FormBuilder);

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

  product = input.required<Product>();
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

  onSubmit() {
    debugger;
    const isValid = this.formProduct.valid;
    this.formProduct.markAsTouched();

    console.log({isValid});

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

    console.log({productLike});

  }

}
