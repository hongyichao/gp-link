import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  IsLoggedIn: boolean;

  constructor(private loginService: LoginService) {
    this.IsLoggedIn = false;
   }

  ngOnInit() {
  }

  ToLogin():void
  {    
    console.debug('test1');
    this.loginService.ToLogin();
    this.IsLoggedIn = this.loginService.IsLoggedIn;
  }

  ToLogout():void
  {
    this.loginService.ToLogOut();
    this.IsLoggedIn = this.loginService.IsLoggedIn;
  }
}
