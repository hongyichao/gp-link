import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [
    AuthComponent,

  ],
  imports: [
    SharedModule
  ]
})
export class AuthModule {}
