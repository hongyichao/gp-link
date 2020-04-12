import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import {AppDataService} from './app-data.service';
import {PatientDataService} from './patient-data.service';
import {LoginComponent } from './login/login.component';
import {AuthGuard} from './auth-guard.service';
import {LoginService} from './login.service';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthInterceptorService } from './interceptors/auth-interceptor';
import { NotfoundComponent } from './notfound/notfound.component';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared.module';
import { RatingComponent } from './shared/rating/rating.component';
import { GpRatingComponent } from './gp-rating/gp-rating.component';
import {CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    LoginComponent,
    NotfoundComponent,
    RatingComponent,
    GpRatingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    SharedModule
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
