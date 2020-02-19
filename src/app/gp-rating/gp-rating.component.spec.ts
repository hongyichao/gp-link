import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpRatingComponent } from './gp-rating.component';

describe('GpRatingComponent', () => {
  let component: GpRatingComponent;
  let fixture: ComponentFixture<GpRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
