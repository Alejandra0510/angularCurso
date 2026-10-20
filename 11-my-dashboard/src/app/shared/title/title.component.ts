import { booleanAttribute, Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-title',
  imports: [],
  template: `
    <h1 class='text-3xl mb-5'>
      {{ title }}
    </h1>
  `,
})
export class TitleComponent {

  // title = input.required<string>();
  @Input({ required: true}) title!: string;
  @Input({ transform: booleanAttribute}) widthShadow:boolean = false;

}
