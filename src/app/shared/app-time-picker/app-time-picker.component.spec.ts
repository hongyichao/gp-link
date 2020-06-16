import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTimePickerComponent } from './app-time-picker.component';

describe('AppTimePickerComponent', () => {
  let component: AppTimePickerComponent;
  let fixture: ComponentFixture<AppTimePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppTimePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
