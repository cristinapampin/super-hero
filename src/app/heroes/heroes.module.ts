import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withJsonpSupport } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER } from 'ngx-ui-loader';

import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroListComponent } from './hero-list/hero-list.component';
import { HeroEditComponent } from './hero-edit/hero-edit.component';
import { HeroService } from './services/hero.service';

import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
    fgsColor: '#ffabf3',
    bgsOpacity: 0.5,
    bgsPosition: 'bottom-right',
    bgsSize: 60,
    bgsType: SPINNER.circle,
    fgsType: SPINNER.circle,
    pbDirection: 'ltr',
    pbThickness: 3,
    text: 'cargando',
};

@NgModule({
    declarations: [HeroListComponent, HeroEditComponent, ConfirmDialogComponent],
    providers: [HeroService, provideHttpClient(withJsonpSupport())],
    imports: [
        CommonModule,
        FormsModule,
        HeroesRoutingModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ],
})
export class HeroesModule {}
