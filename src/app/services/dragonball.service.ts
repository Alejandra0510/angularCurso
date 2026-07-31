import { effect, Injectable, signal } from '@angular/core';
import { Character } from '../pages/interfaces/character.interface';

@Injectable({providedIn: 'root'})
export class DragonballService {

  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 9001 },
    { id: 2, name: 'Vegeta', power: 8000 },
  ]);


  //creación de efectos
  saveToLocalStorage = effect( () => {
    //console.log(`Characted count ${ this.characters().length }`);

    localStorage.setItem('characters', JSON.stringify(this.characters()));
  });

  addCharacter( character: Character ){
    this.characters.update( //actualiza la señal si esta depende de otra
      list => [...list, character]
    )
  }

}
