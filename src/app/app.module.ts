import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorComponent } from './doctor/doctor.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import {AppDataService} from './app-data.service';
import {PatientDataService} from './patient-data.service';
import {LoginComponent } from './login/login.component';
import {AuthGuard} from './auth-guard.service';
import {LoginService} from './login.service';
import { PatientComponent } from './patient/patient.component';
import { PatientsComponent } from './patients/patients.component';
import { AppRoutingModule } from './app-routing.module';
import { ShortenPipe } from './shorten.pipe';
import { DoctorFilterPipe } from './pipes/doctor-filter.pipe';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthInterceptorService } from './interceptors/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    DoctorsComponent,
    DoctorComponent,
    AppHeaderComponent,
    AppointmentComponent,
    AppointmentsComponent,
    LoginComponent,
    PatientComponent,
    PatientsComponent,
    ShortenPipe,
    DoctorFilterPipe
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AppDataService, PatientDataService, AuthGuard, LoginService,
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
