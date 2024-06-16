import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroListComponent } from './hero-list.component';
import { HeroesModule } from '../heroes.module';
import { HeroService } from '../services/hero.service';
import { Observable } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HeroListComponent', () => {
    let component: HeroListComponent;
    let fixture: ComponentFixture<HeroListComponent>;
    const heroServiceSpyObj = jasmine.createSpyObj('HeroService', ['getHeroes']);
    heroServiceSpyObj.getHeroes.and.callFake(() => {
        return new Observable((observer) => {
            observer.next([{}]);
            observer.complete();
        });
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HeroesModule, BrowserAnimationsModule],
            providers: [
                {
                    provide: HeroService,
                    useValue: heroServiceSpyObj,
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(HeroListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should call heroService.getHeroes', () => {
        expect(component.heroService.getHeroes).toHaveBeenCalled();
    });
    it('should get heroes from heroService.getHeroes', () => {
        component.heroService
            .getHeroes()
            .subscribe((result) => expect(result.length).toBeGreaterThan(0));
    });
});
