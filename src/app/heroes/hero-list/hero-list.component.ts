import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HeroService } from '../services/hero.service';
import { Hero } from '../models/hero.interface';

@Component({
    selector: 'app-hero-list',
    templateUrl: './hero-list.component.html',
    styleUrl: './hero-list.component.scss',
})
export class HeroListComponent implements OnInit {
    public heroes$: Observable<Hero[]> = new Observable();

    constructor(private heroService: HeroService) {}

    ngOnInit(): void {
        this.getHeroes();
    }

    getHeroes() {
        this.heroes$ = this.heroService.getHeroes();
    }
}
