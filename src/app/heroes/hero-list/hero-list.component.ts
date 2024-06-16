import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, finalize, map } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { HeroService } from '../services/hero.service';
import { Hero } from '../models/hero.interface';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../shared/notification-service/notification-service.service';

@Component({
    selector: 'app-hero-list',
    templateUrl: './hero-list.component.html',
    styleUrl: './hero-list.component.scss',
})
export class HeroListComponent implements OnInit {
    public heroes$: Observable<Hero[]> = new Observable();
    public filteredHeroes$: Observable<Hero[]> = new Observable();
    public timeoutFilter: NodeJS.Timeout | undefined;

    constructor(
        public heroService: HeroService,
        private ngxLoaderService: NgxUiLoaderService,
        private router: Router,
        public dialog: MatDialog,
        private notificationService: NotificationService,
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
        if (this.timeoutFilter) {
            clearTimeout(this.timeoutFilter);
        }
        this.timeoutFilter = setTimeout(() => {
            const filterValue = event.target.value.trim().toLowerCase();
            this.filterHeroes(filterValue);
        }, 400);
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

    addHero() {
        this.router.navigate(['/heroes/new']);
    }

    editHero(id: number): void {
        this.router.navigate(['/heroes/edit', id]);
    }

    deleteHero(hero: Hero) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '250px',
            data: {
                message: 'Pulsa continuar si deseas eliminar a ',
                hero: hero.name,
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.heroService.deleteHero(hero.id).subscribe({
                    next: () => {
                        this.notificationService.showSuccess('Se ha eliminado correctamente!');
                        this.getHeroes();
                    },
                    error: (err) => {
                        this.notificationService.showError(
                            'No se ha podido eliminar, inténtalo de nuevo más tarde.',
                        );
                        console.error(err);
                    },
                });
            }
        });
    }
}
