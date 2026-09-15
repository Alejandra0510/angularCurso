import { Component, input } from '@angular/core';

@Component({
  selector: 'card-component',
  imports: [],
  templateUrl: './card.component.html',
})
export class CardComponent {

  title = input.required();
}
