import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { DoctorsComponent } from './doctors.component';
import { DoctorComponent } from '../doctor/doctor.component';
import { DoctorResolverService } from './doctor-resolver.service';
import { DoctorAuthGuard } from '../shared-service/doctor-auth-guard.service';

const doctorRoutes: Routes = [
  {
    path: '', component: DoctorsComponent,
    children: [
      {
        path: 'new',
        component: DoctorComponent
      },
      {
        path: ':id',
        component: DoctorComponent
      }
    ],
    canActivate: [DoctorAuthGuard]
  }

];

@NgModule ({
  imports: [RouterModule.forChild(doctorRoutes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule {

}
