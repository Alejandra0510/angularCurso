import { Component } from '@angular/core';
import { HeavyLoadersSlowComponent } from '@shared/heavy-loaders/heavy-loaders.slow';

@Component({
  selector: 'app-defes-views',
  imports: [HeavyLoadersSlowComponent],
  templateUrl: './defer-views.component.html',
})
export default class DeferViewsComponent {}
