import { Component, OnInit } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { HeroService } from '../services/hero.service';
import { Hero } from '../models/hero.interface';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
    selector: 'app-hero-list',
    templateUrl: './hero-list.component.html',
    styleUrl: './hero-list.component.scss',
})
export class HeroListComponent implements OnInit {
    public heroes$: Observable<Hero[]> = new Observable();

    constructor(
        private heroService: HeroService,
        private ngxLoaderService: NgxUiLoaderService,
    ) {}

    ngOnInit(): void {
        this.getHeroes();
    }

    getHeroes() {
        this.ngxLoaderService.start();
        this.heroes$ = this.heroService.getHeroes().pipe(
            finalize(() => {
                this.ngxLoaderService.stop();
            }),
        );
    }
}
