import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentModelComponent } from './appointment-model.component';

describe('AppointmentModelComponent', () => {
  let component: AppointmentModelComponent;
  let fixture: ComponentFixture<AppointmentModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
