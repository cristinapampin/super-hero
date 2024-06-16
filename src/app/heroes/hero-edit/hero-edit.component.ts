import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroService } from '../services/hero.service';
import { Hero } from '../models/hero.interface';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-hero-edit',
    templateUrl: './hero-edit.component.html',
    styleUrls: ['./hero-edit.component.scss'],
})
export class HeroEditComponent implements OnInit {
    hero: Hero | undefined;
    lastHeroId$: Observable<number>;

    constructor(
        private heroService: HeroService,
        private router: Router,
    ) {
        this.lastHeroId$ = new Observable<number>();
    }

    ngOnInit(): void {
        this.newHero();
    }

    newHero() {
        this.heroService.getMaxHeroId().subscribe((maxId) => {
            this.hero = { id: maxId + 1, name: '' };
        });
    }

    transformToUpperCase(value: string): void {
        if (this.hero) {
            this.hero.name = value.toUpperCase();
        }
    }

    saveHero() {
        if (this.hero) {
            this.hero.name = this.hero.name.toLowerCase();
            this.heroService.addHero(this.hero).subscribe(() => this.router.navigate(['/heroes']));
        }
    }

    goBack(): void {
        this.router.navigate(['/heroes']);
    }
}
