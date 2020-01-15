import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorComponent } from './doctor/doctor.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from './auth-guard.service';
import { PatientsComponent } from './patients/patients.component';
import { PatientComponent } from './patient/patient.component';

const appRoutes: Routes = [
  { 
    path: 'doctors', component: DoctorsComponent, 
    children:[{path: ':id', component: DoctorComponent}] 
  },
  { path: 'appointments', component: AppointmentsComponent, canActivate:[AuthGuard] }, 
  { 
    path: 'patients', component: PatientsComponent, 
    children:[{path:':id', component: PatientComponent}],
    canActivate:[AuthGuard] 
  }, 
  { path: 'login', component: LoginComponent }, 
  { path: '**', redirectTo:'doctors' } 
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
