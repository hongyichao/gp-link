import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DoctorsComponent } from './doctors.component';
import { DoctorComponent } from '../doctor/doctor.component';
import { DoctorFilterPipe } from '../pipes/doctor-filter.pipe';
import { AlertComponent } from '../shared/alert/alert.component';
import { AlertModalComponent } from '../shared/alert-modal/alert-modal.component';
import { ShortenPipe } from '../shorten.pipe';
import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorResolverService } from './doctor-resolver.service';
import { SharedModule } from '../shared.module';


@NgModule({
  declarations: [
    DoctorsComponent,
    DoctorComponent,
    DoctorFilterPipe,
    AlertComponent,
    AlertModalComponent,
    ShortenPipe
  ],
  entryComponents: [AlertModalComponent],
  imports: [
    RouterModule,
    DoctorRoutingModule,
    SharedModule
  ]

})
export class DoctorModule {

}
