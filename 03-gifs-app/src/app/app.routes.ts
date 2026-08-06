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
        loadComponent: () => import('./gifs/pages/trending-page/trending-page.component')
      },
      //crear ruta search
      {
        path: 'search',
        loadComponent: () => import('./gifs/pages/search-page/search-page.component')
      },
      {
        // mandar argumentos dinámicos
        path: 'history/:query',
        loadComponent: () => import('./gifs/pages/gif-history/gif-history.component')
      },
      {
        path: '**',
        redirectTo: 'trending'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }

];
