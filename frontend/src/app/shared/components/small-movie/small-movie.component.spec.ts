import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallMovieComponent } from './small-movie.component';

describe('SmallMovieComponent', () => {
  let component: SmallMovieComponent;
  let fixture: ComponentFixture<SmallMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallMovieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
