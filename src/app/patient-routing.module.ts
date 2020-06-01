import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth-guard.service';
import { PatientsComponent } from './patients/patients.component';
import { PatientComponent } from './patient/patient.component';
import { PatientAuthGuard } from './shared-service/patient-auth-guard.service';

const routes: Routes = [
  {
    path: '', component: PatientsComponent,
    children: [{path: ':id', component: PatientComponent}],
    canActivate: [PatientAuthGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
