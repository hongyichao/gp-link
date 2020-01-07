import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorComponent } from './doctor/doctor.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import {AppDataService} from './app-data.service';

const appRoutes: Routes = [
  { path: 'doctors', component: DoctorsComponent, children: [
      {path: ':id', component: DoctorComponent}      
    ] 
  },
  { path: 'appointments',      component: AppointmentsComponent }  
];

@NgModule({
  declarations: [
    AppComponent,
    DoctorsComponent,
    DoctorComponent,
    AppHeaderComponent,
    AppointmentComponent,
    AppointmentsComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule
  ],
  providers: [AppDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
