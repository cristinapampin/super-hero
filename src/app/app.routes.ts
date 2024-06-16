import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/heroes', pathMatch: 'full' },
    {
        path: 'heroes',
        loadChildren: () => import('./heroes/heroes.module').then((m) => m.HeroesModule),
    },
];
