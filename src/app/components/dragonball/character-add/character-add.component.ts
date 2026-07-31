import { Component, output, signal } from '@angular/core';
import { Character } from '../../../pages/interfaces/character.interface';

@Component({
  selector: 'dragonball-character-add',
  templateUrl: './character-add.component.html',
})

export class CharacterAddComponent {

  name = signal("");
  power = signal(0);

  //emitir un resultado
  newCharacter = output<Character>();


  addCharacter(){

    if(!this.name() || !this.power() || this.power() <= 0){
      return;
    }

    const newCharacter: Character = {
      // id: this.characters().length + 1,
      id: Math.floor(Math.random()),
      name: this.name(),
      power: this.power()
    };

    // this.characters.update((list) => [...list, newCharacter]);
    this.newCharacter.emit(newCharacter);
    this.resetCharacter();

  }

  resetCharacter(){
    this.name.set('');
    this.power.set(0);
  }

}
