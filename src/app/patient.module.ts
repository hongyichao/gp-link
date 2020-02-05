import {PatientComponent} from './patient/patient.component';
import {PatientsComponent} from './patients/patients.component';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule ({
  declarations: [
    PatientComponent,
    PatientsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class PatientModule {

}
