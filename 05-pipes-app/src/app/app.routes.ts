import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'basic',
        title: 'Pipes Básicos',
        loadComponent: () => import("./pages/basic-page/basic-page.component")
    },
    {
        path: 'numbers',
        title: 'Pipes Númericos',
        loadComponent: () => import("./pages/numbers-page/numbers-page.component")
    },
    {
        path: 'custom',
        title: 'Pipes Personalizados',
        loadComponent: () => import("./pages/custom-page/custom-page.component")
    },
    {
        path: 'uncommon',
        title: 'Pipes Poco Comunes',
        loadComponent: () => import("./pages/uncommon-page/uncommon-page.component")
    },
    {
        path: '**',
        redirectTo: 'basic'
    }

];
