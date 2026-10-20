import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  selector: 'app-change-detection',
  imports: [TitleComponent, JsonPipe],
  template: `
    <app-title title="Change Detection" />
    <pre>{{ frameworkAsSignal() | json }}</pre>
    <pre>{{ frameworkAsProperty | json }}</pre>
  `
})
export default class ChangeDetectionComponent {

  public frameworkAsSignal = signal({
    name: 'Angular',
    releaseDate: 2016
  });

  public frameworkAsProperty = {
    name: 'Angular',
    releaseDate: 2016
  };

  constructor(){

    setTimeout(() => {
      this.frameworkAsProperty.name = 'React';
      this.frameworkAsProperty.releaseDate = 2018;
      console.log("Hecho");
    }, 3000);

  }

}
