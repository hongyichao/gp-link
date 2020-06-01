import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {
  isLoggedIn = false;
  userRole: string;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.IsLoggedIn.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.isLoggedIn = isLoggedIn;
        this.userRole = this.authService.loggedInUser.Type;
      }
    });

  }

  // IsUserLoggedIn()
  // {
  //   return !this.loginService.IsLoggedIn.value;
  // }

}
