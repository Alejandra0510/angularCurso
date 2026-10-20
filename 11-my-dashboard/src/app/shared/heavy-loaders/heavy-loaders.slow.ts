import { Component, input, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  imports: [NgClass],
  selector: 'heavy-loaders-slow',
  template: `
    <section [ngClass]="['w-full h-600px', cssClass]">
      Heavy Loader Slow
    </section>
  `
})

export class HeavyLoadersSlowComponent {

  @Input({ required: true}) cssClass!: string;


  constructor(){
    // console.log('Heavy Loader Component');

    const start = Date.now();

    while(Date.now() - start < 3000){
      console.log('Cargado');

    }
  }
}
