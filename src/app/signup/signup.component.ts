import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor() { }

  signupForm = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastname: new FormControl(null, Validators.required),
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    phone: new FormControl(null, Validators.required),
    type: new FormControl(null, Validators.required),
  });

  ngOnInit(): void {
  }

  onSignUpFormSubmitted() {
    if (this.signupForm.status === 'VALID') {
      console.log(this.signupForm.value);
    } else {
      console.log(this.signupForm);
    }
  }


}
