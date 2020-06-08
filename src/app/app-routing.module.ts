import { NgModule } from '@angular/core';
import {RouterModule, Routes, PreloadAllModules} from '@angular/router';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from './auth-guard.service';
import { AuthComponent } from './auth/auth.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { GpRatingComponent } from './gp-rating/gp-rating.component';
import { SignupComponent } from './signup/signup.component';
import { DoctorSpaceComponent } from './doctor-space/doctor-space.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { PatientSpaceComponent } from './patient-space/patient-space.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'doctors', loadChildren: () => import('./doctors/doctor.module').then(m => m.DoctorModule)},
  { path: 'patients', loadChildren: () => import('./patient.module').then(m => m.PatientModule)},
  { path: 'gprating', component: GpRatingComponent, canActivate: [AuthGuard] },
  { path: 'doctorspace', component: DoctorSpaceComponent, canActivate: [AuthGuard] },
  { path: 'patientspace', component: PatientSpaceComponent, canActivate: [AuthGuard] },
  {
    path: 'users', component: UsersComponent,
    children: [
      {
        path: 'new',
        component: UserComponent
      },
      {
        path: ':id',
        component: UserComponent
      }
    ],
    canActivate: [AuthGuard]
  },
  { path: 'auth', component: AuthComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent },
  { path: 'appointments', component: AppointmentsComponent },
  { path: '**', component: NotfoundComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
