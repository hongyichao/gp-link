import {PatientComponent} from './patient/patient.component';
import {PatientsComponent} from './patients/patients.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PatientRoutingModule } from './patient-routing.module';
import { SharedModule } from './shared.module';

@NgModule ({
  declarations: [
    PatientComponent,
    PatientsComponent
  ],
  imports: [
    ReactiveFormsModule,
    PatientRoutingModule,
    SharedModule
  ]
})
export class PatientModule {

}
