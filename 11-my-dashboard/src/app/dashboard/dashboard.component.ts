import { Component } from '@angular/core';
import { SideMenuComponent } from '@shared/side-menu/side-menu.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [SideMenuComponent, RouterModule],
  templateUrl: './dashboard.component.html',
})
export default class DashboardComponent {}
