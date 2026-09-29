import { Routes } from '@angular/router';
import { FullsrceenMapPageComponent } from './pages/fullsrceen-map-page/fullsrceen-map-page.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { HousesPageComponent } from './pages/houses-page/houses-page.component';

export const routes: Routes = [

    {
        path: 'fullscreen',
        component: FullsrceenMapPageComponent,
        title: 'FullScreen Map'

    },
    {
        path: 'markers',
        component: MarkersPageComponent,
        title: 'Markers'
    },
    {
        path: 'houses',
        component: HousesPageComponent,
        title: 'Available Properties'
    },
    {
        path: '**',
        redirectTo: 'fullscreen'
    }
];
