import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Hero } from '../models/hero.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class HeroService {
    private heroesUrl = 'http://localhost:3000/heroes';

    constructor(private http: HttpClient) {}

    getHeroes(): Observable<Hero[]> {
        return this.http.get<Hero[]>(this.heroesUrl);
    }

    getMaxHeroId(): Observable<number> {
        return this.getHeroes().pipe(
            map((heroes) => Math.max(...heroes.map((hero) => hero.id), 0)),
        );
    }

    addHero(hero: Hero): Observable<void> {
        return this.http.post<void>(this.heroesUrl, hero);
    }
}
