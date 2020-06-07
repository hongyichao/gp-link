import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSpaceComponent } from './patient-space.component';

describe('PatientSpaceComponent', () => {
  let component: PatientSpaceComponent;
  let fixture: ComponentFixture<PatientSpaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientSpaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
