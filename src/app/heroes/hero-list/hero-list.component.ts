import { Component, OnInit } from '@angular/core';
import { Observable, finalize, map } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { HeroService } from '../services/hero.service';
import { Hero } from '../models/hero.interface';

@Component({
    selector: 'app-hero-list',
    templateUrl: './hero-list.component.html',
    styleUrl: './hero-list.component.scss',
})
export class HeroListComponent implements OnInit {
    public heroes$: Observable<Hero[]> = new Observable();
    public filteredHeroes$: Observable<Hero[]> = new Observable();

    constructor(
        public heroService: HeroService,
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
        this.filteredHeroes$ = this.heroes$;
    }

    onFilterChange(event: any): void {
        const filterValue = event.target.value.trim().toLowerCase();
        this.filterHeroes(filterValue);
    }

    filterHeroes(filterValue: string): void {
        if (!filterValue) {
            this.filteredHeroes$ = this.heroes$;
        } else {
            this.filteredHeroes$ = this.heroes$.pipe(
                map((heroes) =>
                    heroes.filter((hero) => hero.name.toLowerCase().includes(filterValue)),
                ),
            );
        }
    }
}
