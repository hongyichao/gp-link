import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorComponent } from './doctor/doctor.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from './auth-guard.service';
import { PatientsComponent } from './patients/patients.component';
import { PatientComponent } from './patient/patient.component';
import { AuthComponent } from './auth/auth.component';
import { DoctorResolverService } from './doctors/doctor-resolver.service';
import { NotfoundComponent } from './notfound/notfound.component';

const appRoutes: Routes = [
  {
    path: '', redirectTo: '/doctors', pathMatch: 'full'
  },
  { path: 'appointments', component: AppointmentsComponent, canActivate:[AuthGuard] },
  {
    path: 'patients', component: PatientsComponent,
    children: [{path: ':id', component: PatientComponent}],
    canActivate: [AuthGuard]
  },
  {
    path: 'auth', component: AuthComponent
  },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
