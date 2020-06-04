import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSpaceComponent } from './doctor-space.component';

describe('DoctorSpaceComponent', () => {
  let component: DoctorSpaceComponent;
  let fixture: ComponentFixture<DoctorSpaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorSpaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
