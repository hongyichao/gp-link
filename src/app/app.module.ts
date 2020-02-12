import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import {AppDataService} from './app-data.service';
import {PatientDataService} from './patient-data.service';
import {LoginComponent } from './login/login.component';
import {AuthGuard} from './auth-guard.service';
import {LoginService} from './login.service';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthInterceptorService } from './interceptors/auth-interceptor';
import { AuthComponent } from './auth/auth.component';
import { PatientModule } from './patient.module';
import { DoctorModule } from './doctor.module';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppointmentComponent,
    AppointmentsComponent,
    LoginComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    PatientModule,
    DoctorModule
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
