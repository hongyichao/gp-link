import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { DoctorsComponent } from './doctors.component';
import { DoctorComponent } from '../doctor/doctor.component';
import { DoctorResolverService } from './doctor-resolver.service';

const doctorRoutes: Routes = [
  {
    path: '', component: DoctorsComponent,
    children: [
      {
        path: ':id',
        component: DoctorComponent,
        resolve: [DoctorResolverService]
      }
    ]
  }

];

@NgModule ({
  imports: [RouterModule.forChild(doctorRoutes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule {

}
