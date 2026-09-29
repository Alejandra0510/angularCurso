import { Component, input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-title',
  imports: [],
  templateUrl: './title.component.html',
})
export class TitleComponent implements OnChanges {

  title = input.required<string>();

  ngOnChanges(changes: SimpleChanges<TitleComponent>) {
    console.log('ngOnChanges')
    if (changes.title) {
      console.log(`Previous: ${changes.title.previousValue}`);
      console.log(`Current: ${changes.title.currentValue}`);
      console.log(`Is first ${changes.title.firstChange}`);
    }
  }
}
