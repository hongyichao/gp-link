import { NgModule } from '@angular/core';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorComponent } from './doctor/doctor.component';
import { DoctorFilterPipe } from './pipes/doctor-filter.pipe';
import { AlertComponent } from './shared/alert/alert.component';
import { AlertModalComponent } from './shared/alert-modal/alert-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ShortenPipe } from './shorten.pipe';
import { DoctorRoutingModule } from './doctor-routing.module';


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
    NgbModule,
    BrowserModule,
    FormsModule,
    DoctorRoutingModule
  ]

})
export class DoctorModule {

}
