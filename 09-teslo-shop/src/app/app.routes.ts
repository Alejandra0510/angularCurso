import { Routes } from '@angular/router';

export const routes: Routes = [

  //rutas de autenticación
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
    // TODO Guards
  },

  {
    path: '',
    loadChildren: () => import('./store-front/store.front.routes'),
  },

];
