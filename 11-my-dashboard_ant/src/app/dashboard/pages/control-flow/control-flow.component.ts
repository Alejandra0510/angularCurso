import { Component, signal } from '@angular/core';

type Grade = 'A'|'B'|'C'|'F';

@Component({
  imports: [],
  styles: ``,
  templateUrl: './control-flow.component.html',
})
export default class ControlFlowComponent {

  public showContent = signal(false);
  public grade = signal<Grade>('C');
  public frameworks = signal(['Angular', 'Vue', 'React', 'Svelte', 'Qwik']);
  public frameworks2 = signal([]);

  // Señal que no permite modificar su valor
  // public showContent = signal(false).asReadonly;

  public toggleContent(){
    this.showContent.update( value => !value);
  }

}
