import { Component, signal } from "@angular/core";

interface Character {
  id: number,
  name: string,
  power: number
}

@Component({
  templateUrl: './dragonball-page.component.html'
})


export class DragonballPageComponent {

  name = signal("Gohan");
  power = signal(100);

  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 9001 },
    // { id: 2, name: 'Vegeta', power: 8000 },
    // { id: 3, name: 'Piccole', power: 3000 },
    // { id: 4, name: 'Yancha', power: 500 },
  ]);


  // addCharacter(){

  //   console.log("Nombre " + this.name());
  //   console.log("Poder " + this.power());
  // }

  addCharacter(){

    if(!this.name() || !this.power() || this.power() <= 0){
      return;
    }

    const newCharacter: Character = {
      id: this.characters().length + 1,
      name: this.name(),
      power: this.power()
    };

    this.characters.update((list) => [...list, newCharacter]);
    this.resetCharacter();

  }

  resetCharacter(){
    this.name.set('');
    this.power.set(0);
  }
}


