import { Routes } from '@angular/router';
import { AdminDasboardLayoutComponent } from './pages/admin-dashboard-layout/admin-dahsboard-layout.component';
import { ProductsAdminPageComponent } from './pages/products-admin-page/products-admin-page.component';
import { ProductAdminPageComponent } from './pages/product-admin-page/product-admin-page.component';
import { isAdminGuard } from '@auth/guards/is-admin.guard';

export const adminDashboardRoutes: Routes = [
  {
    path: '',
    component: AdminDasboardLayoutComponent,
    canMatch: [isAdminGuard],
    children: [
      {
        path: 'products',
        component: ProductsAdminPageComponent
      },
      {
        path: 'products/:id',
        component: ProductAdminPageComponent
      },
      {
        path: '**',
        redirectTo: 'products'
      }
    ]
  }
];


export default adminDashboardRoutes;
