import { Component, OnInit, OnDestroy, NgZone, AfterViewInit, ViewChild  } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy//, AfterViewInit
{
  @ViewChild('loginForm') loginForm: NgForm;
  username: string;
  password: string;

  IsLoggedIn: boolean;

  LoginStatusSub = new Subscription;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {
  }


  //public auth2: any;

  /*
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
  */

  ngOnInit() {
    this.authService.IsLoggedIn.subscribe(isloggedIn => {
      if (isloggedIn) {
        const returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
        this.router.navigate([returnUrl]);
      }
    });
  }

  ngOnDestroy(){
    this.LoginStatusSub.unsubscribe();
  }

  onUserLogin() {
    const frmValue = this.loginForm.form.value;
    const loggedInUser = this.authService.login(frmValue.username, frmValue.password);

    // if (loggedInUser) {
    //   if (loggedInUser.Type === 'doctor' || loggedInUser.Type === 'admin') {
    //     this.router.navigate(['/doctors']);
    //   }

    //   if (loggedInUser.Type === 'patient') {
    //     this.router.navigate(['/patients']);
    //   }
    // }
  }

  ToLogout() {
    this.authService.logout();
  }

  onLoginFormSubmit(ngForm: NgForm) {
    const formValue = ngForm.value;

    this.authService.signin(formValue.username, formValue.password);
  }

  redirectToSignUp() {
    this.router.navigate(['/signup']);
  }
}
