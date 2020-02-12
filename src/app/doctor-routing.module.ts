import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorComponent } from './doctor/doctor.component';
import { DoctorResolverService } from './doctors/doctor-resolver.service';

const doctorRoutes: Routes = [
  {
    path: 'doctors', component: DoctorsComponent,
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
  imports: [
    RouterModule.forChild(doctorRoutes)
  ],
  exports: [RouterModule]
})
export class DoctorRoutingModule {

}
