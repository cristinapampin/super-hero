import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroListComponent } from './hero-list/hero-list.component';
import { HeroEditComponent } from './hero-edit/hero-edit.component';

const routes: Routes = [
    { path: '', component: HeroListComponent },
    { path: 'edit/:id', component: HeroEditComponent },
    { path: 'new', component: HeroEditComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HeroesRoutingModule {}
