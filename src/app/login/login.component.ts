import { Component, OnInit, OnDestroy, NgZone, AfterViewInit  } from '@angular/core';
import { LoginService } from '../login.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {
  IsLoggedIn: boolean;

  LoginStatusSub = new Subscription;

  constructor(private loginService: LoginService, private router: Router) {
    this.IsLoggedIn = this.loginService.IsLoggedIn.value;
  }


  public auth2: any;
  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '144812582479-fbr4silmo92ao1djmqj1fh40o7rsj6ti.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }

  public gUser:any;

  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
this.gUser = googleUser;
        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE
        console.log(gapi.auth2.getAuthInstance().isSignedIn);

      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  ngAfterViewInit() {
        this.googleInit();
  }

  signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        console.log('User signed out.');
        console.log(gapi.auth2.getAuthInstance().isSignedIn);
    });
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
    const redirectUri = this.loginService.GetRedirectPageUrl();
    this.router.navigate([redirectUri]);
  }

  ToLogout():void
  {
    this.loginService.ToLogOut();

  }
}
