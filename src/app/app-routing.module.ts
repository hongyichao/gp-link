import { NgModule } from '@angular/core';
import {RouterModule, Routes, PreloadAllModules} from '@angular/router';
import { AppointmentsComponent } from './appointments/appointments.component';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from './auth-guard.service';
import { AuthComponent } from './auth/auth.component';
import { NotfoundComponent } from './notfound/notfound.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/doctors', pathMatch: 'full'},
  { path: 'doctors', loadChildren: () => import('./doctors/doctor.module').then(m => m.DoctorModule) },
  { path: 'patients', loadChildren: () => import('./patient.module').then(m => m.PatientModule) },
  { path: 'appointments', component: AppointmentsComponent, canActivate: [AuthGuard] },
  {
    path: 'auth', component: AuthComponent
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotfoundComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
