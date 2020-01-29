import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }


  onFormSubmit(ngForm: NgForm) {
    let formValue = ngForm.value;

    this.authService.signup(formValue.email, formValue.password).subscribe( respData => {
      console.log(respData);
    },
    err => {
      console.log(err);
    });
  }
}
