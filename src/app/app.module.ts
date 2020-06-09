import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import {AppDataService} from './app-data.service';
import {LoginComponent } from './login/login.component';
import {AuthGuard} from './auth-guard.service';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthInterceptorService } from './interceptors/auth-interceptor';
import { NotfoundComponent } from './notfound/notfound.component';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared.module';
import { RatingComponent } from './shared/rating/rating.component';
import { GpRatingComponent } from './gp-rating/gp-rating.component';
import { PatientAuthGuard } from './shared-service/patient-auth-guard.service';
import { DoctorAuthGuard } from './shared-service/doctor-auth-guard.service';
import { SignupComponent } from './signup/signup.component';
import { DoctorSpaceComponent } from './doctor-space/doctor-space.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { PatientSpaceComponent } from './patient-space/patient-space.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { UserFilterPipe } from './pipes/user-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    LoginComponent,
    NotfoundComponent,
    RatingComponent,
    GpRatingComponent,
    SignupComponent,
    DoctorSpaceComponent,
    AppointmentsComponent,
    AppointmentComponent,
    PatientSpaceComponent,
    UsersComponent,
    UserComponent,
    UserFilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [
    AppDataService, AuthGuard,
    PatientAuthGuard, DoctorAuthGuard,
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
