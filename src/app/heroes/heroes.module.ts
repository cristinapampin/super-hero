import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withJsonpSupport } from '@angular/common/http';

import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroListComponent } from './hero-list/hero-list.component';
import { HeroEditComponent } from './hero-edit/hero-edit.component';
import { HeroService } from './services/hero.service';
import { MatListModule } from '@angular/material/list';

@NgModule({
    declarations: [HeroListComponent, HeroEditComponent],
    providers: [HeroService, provideHttpClient(withJsonpSupport())],
    imports: [CommonModule, HeroesRoutingModule, MatListModule],
})
export class HeroesModule {}
