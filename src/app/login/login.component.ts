import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  IsLoggedIn: boolean;

  LoginStatusSub = new Subscription;
  constructor(private loginService: LoginService) {
    this.IsLoggedIn = this.loginService.IsLoggedIn.value;
   }

  ngOnInit() {
    this.loginService.IsLoggedIn.subscribe(isloggedIn=>{this.IsLoggedIn = isloggedIn});
  }

  ngOnDestroy(){
    this.LoginStatusSub.unsubscribe();
  }

  ToLogin():void
  {
    this.loginService.ToLogin();

  }

  ToLogout():void
  {
    this.loginService.ToLogOut();

  }

  onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }
}
