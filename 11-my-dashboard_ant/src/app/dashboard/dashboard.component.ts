import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideMenuComponent } from '@shared/side-menu/side-menu.component';

@Component({
  imports: [RouterModule, SideMenuComponent],
  styles: ``,
  templateUrl: './dashboard.component.html',
})
export default class DashboardComponent {}
