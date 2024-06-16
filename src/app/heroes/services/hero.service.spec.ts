import { TestBed } from '@angular/core/testing';

import { HeroService } from './hero.service';
import { HttpClient } from '@angular/common/http';

describe('HeroService', () => {
    let service: HeroService;
    const httpSpyObject = jasmine.createSpyObj('HttpClient', ['get']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [{ provide: HttpClient, useValue: httpSpyObject }],
        });
        service = TestBed.inject(HeroService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
