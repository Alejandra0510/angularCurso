import { Component, computed, signal } from "@angular/core";
import { UpperCasePipe } from "@angular/common";

@Component({
  templateUrl: './hero-page.component.html',
  imports: [ UpperCasePipe ]
})

export class HeroPageComponent {

  name = signal('Ironman');
  age = signal(45);

  heroDescription = computed(() => {
    const description = `${ this.name() } - ${ this.age() }`;
    return description;
  });

  // Señal computarizada
  capitalizedName = computed(() => this.name().toUpperCase() );

  changeHero(){
    this.age.set(22);
    this.name.set('Spiderman');
  }

  chageAge(){
    this.age.set(60);
  }

  resetForm(){
    this.age.set(45);
    this.name.set('Ironman');
  }



}
