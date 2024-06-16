import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    isNewHero: boolean = false;
    lastHeroId$: Observable<number>;

    constructor(
        private heroService: HeroService,
        private notificationService: NotificationService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.lastHeroId$ = new Observable<number>();
    }

    ngOnInit(): void {
        const heroId = this.route.snapshot.paramMap.get('id');
        if (heroId) {
            this.editHero(parseInt(heroId));
        } else {
            this.newHero();
            this.isNewHero = true;
        }
    }

    newHero() {
        this.heroService.getMaxHeroId().subscribe((maxId) => {
            this.hero = { id: maxId + 1, name: '' };
        });
    }

    editHero(heroId: number) {
        this.heroService.getHeroeById(heroId).subscribe((hero) => {
            this.hero = hero;
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
            if (this.isNewHero) {
                this.heroService.addHero(this.hero).subscribe({
                    next: () => {
                        this.notificationService.showSuccess('Se ha creado correctamente!');
                        this.router.navigate(['/heroes']);
                    },
                    error: (err) => {
                        this.notificationService.showError(
                            'No se ha podido crear, inténtalo de nuevo más tarde.',
                        );
                        console.error(err);
                    },
                });
            } else {
                this.heroService.updateHero(this.hero).subscribe({
                    next: () => {
                        this.notificationService.showSuccess('Se ha modificado correctamente!');
                        this.router.navigate(['/heroes']);
                    },
                    error: (err) => {
                        this.notificationService.showError(
                            'No se ha podido modificar, inténtalo de nuevo más tarde.',
                        );
                        console.error(err);
                    },
                });
            }
        }
    }

    goBack(): void {
        this.router.navigate(['/heroes']);
    }
}
