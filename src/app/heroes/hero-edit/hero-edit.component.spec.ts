import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroEditComponent } from './hero-edit.component';
import { HeroesModule } from '../heroes.module';
import { HeroService } from '../services/hero.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

describe('HeroEditComponent', () => {
    let component: HeroEditComponent;
    let fixture: ComponentFixture<HeroEditComponent>;
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const heroServiceSpy = jasmine.createSpyObj('HeroService', ['getMaxHeroId', 'addHero']);
    beforeEach(async () => {
        heroServiceSpy.getMaxHeroId.and.callFake(() => new Observable());

        await TestBed.configureTestingModule({
            imports: [HeroesModule],
            providers: [
                { provide: HeroService, useValue: heroServiceSpy },
                { provide: Router, useValue: routerSpy },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: { paramMap: { get: () => {} } },
                    },
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(HeroEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should transform hero name to uppercase', () => {
        component.hero = { id: 1, name: 'name' };
        component.transformToUpperCase('new name');
        expect(component.hero.name).toBe('NEW NAME');
    });
    it('should call getMaxHeroId', () => {
        component.ngOnInit();
        expect(heroServiceSpy.getMaxHeroId).toHaveBeenCalled();
    });
    it('should navigate back to /heroes', () => {
        component.goBack();
        expect(routerSpy.navigate).toHaveBeenCalled();
    });
});

describe('HeroEditComponent', () => {
    let component: HeroEditComponent;
    let fixture: ComponentFixture<HeroEditComponent>;
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHeroeById']);
    beforeEach(async () => {
        heroServiceSpy.getHeroeById.and.callFake(() => new Observable());

        await TestBed.configureTestingModule({
            imports: [HeroesModule],
            providers: [
                { provide: HeroService, useValue: heroServiceSpy },
                { provide: Router, useValue: routerSpy },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            paramMap: {
                                get: () => {
                                    return '1';
                                },
                            },
                        },
                    },
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(HeroEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should call getMaxHeroId', () => {
        component.ngOnInit();
        expect(heroServiceSpy.getHeroeById).toHaveBeenCalled();
    });
});
