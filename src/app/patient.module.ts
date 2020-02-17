import {PatientComponent} from './patient/patient.component';
import {PatientsComponent} from './patients/patients.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PatientRoutingModule } from './patient-routing.module';

@NgModule ({
  declarations: [
    PatientComponent,
    PatientsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    PatientRoutingModule
  ],
  exports: [BrowserModule]
})
export class PatientModule {

}
