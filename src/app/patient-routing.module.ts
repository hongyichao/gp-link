import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth-guard.service';
import { PatientsComponent } from './patients/patients.component';
import { PatientComponent } from './patient/patient.component';

const routes: Routes = [
  {
    path: 'patients', component: PatientsComponent,
    children: [{path: ':id', component: PatientComponent}],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
