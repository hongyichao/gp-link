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
}
