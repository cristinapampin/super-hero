import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroService } from '../services/hero.service';
import { Hero } from '../models/hero.interface';
import { Observable } from 'rxjs';
import { NotificationService } from '../../shared/notification-service/notification-service.service';

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
        private notificationService: NotificationService,
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
            this.heroService.addHero(this.hero).subscribe({
                next: () => {
                    this.notificationService.showSuccess('Se ha creado correctamente!');
                    this.router.navigate(['/heroes']);
                },
                error: (err) => {
                    this.notificationService.showError(
                        'Ha ocurrido un error, inténtalo de nuevo más tarde.',
                    );
                    console.error(err);
                },
            });
        }
    }

    goBack(): void {
        this.router.navigate(['/heroes']);
    }
}
