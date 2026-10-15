import { Routes } from '@angular/router';
import { NotAuthenticatedGuard } from '@auth/guards/not-authenticated.guard';

export const routes: Routes = [

  //rutas de autenticación
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
    // TODO Guards
    canMatch: [
      NotAuthenticatedGuard,
    ]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin-dashboard/admin-dashboard.routes'),
  },
  {
    path: '',
    loadChildren: () => import('./store-front/store.front.routes'),
  },

];
