import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  hasSignedup = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }


  onConfirmFormSubmit(ngForm: NgForm) {
    let formValue = ngForm.value;

    this.authService.confirmUser(formValue.vusername, formValue.vcode);
  }
}
