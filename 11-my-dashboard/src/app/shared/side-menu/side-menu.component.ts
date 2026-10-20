import { Component } from '@angular/core';
import { routes } from '../../app.routes';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  imports: [RouterModule],
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
