import { TrendingPageComponent } from './gifs/pages/trending-page/trending-page.component';
import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'dashboard',
    //carga peresoza
    loadComponent: () => import('./gifs/pages/dashboard-page/dashboard-page.component'),

    //rutas hijas
    children: [
       //crear ruta trending
        {
          path: 'trending',
          loadComponent: () => import('./gifs/pages/trending-page/trending-page.component') .then(e => e.TrendingPageComponent)
        },
        //crear ruta search
        {
          path: 'search',
          loadComponent: () => import('./gifs/pages/search-page/search-page.component') .then(e => e.SearchPageComponent)
        },
        // {
        //   path: '**',
        //   redirectTo: 'trending'
        // }
      ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }

];
