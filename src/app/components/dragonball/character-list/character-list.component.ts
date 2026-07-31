import { Component, input } from '@angular/core';
import { Character } from '../../../pages/interfaces/character.interface';

@Component({
  selector: 'dragonball-character-list',
  templateUrl: './character-list.component.html',
})
export class CharacterListComponent {
  characters = input.required<Character[]>(); //input signal forma reactiva de pasar datos desde un componente principal (padre) hacia un componente secundario (hijo)
  listName = input.required<string>();
}
