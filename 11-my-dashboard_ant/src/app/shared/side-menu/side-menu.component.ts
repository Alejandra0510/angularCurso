
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from '../../app.routes';
@Component({
  imports: [RouterModule],
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {

  public menuItems = routes
    .map(
      route => route.children ?? []
    )
    .flat() //obtiene el total de arreglos (incluyendo vacios)
    .filter( route => route && route.path )
    .filter(route => !route.path?.includes(':'));

  constructor(){
  //   const dashboardRoutes = routes
  //   .map(
  //     route => route.children ?? []
  //   )
  //   .flat() //obtiene el total de arreglos (incluyendo vacios)
  //   .filter( route => route && route.path )
  //   .filter(route => !route.path?.includes(':'))

  //   console.log(dashboardRoutes);
  }
}
