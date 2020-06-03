import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserRegistration } from '../shared-models/app.user-registration';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpResult = true;
  validRegistration = true;

  constructor(private authService: AuthService, private router: Router) { }

  signupForm = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
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

      const frmVal = this.signupForm.value;

      const userRegistration: UserRegistration = {
        FirstName: frmVal.firstName,
        LastName: frmVal.lastName,
        Username: frmVal.username,
        Password: frmVal.password,
        Email: frmVal.email,
        Phone: frmVal.phone,
        Type: frmVal.type
      };

      this.signUpResult = this.authService.signup(userRegistration);

      if (this.signUpResult) {
        this.router.navigate(['/login']);
      }
    } else {
      this.validRegistration = false;
      console.log(this.signupForm);
    }
  }

  isFieldInvalid(frmControlName: string) {
    return !this.signupForm.get(frmControlName).valid && this.signupForm.get(frmControlName).touched;
  }

  onCancelSignup() {
    this.router.navigate(['/login']);
  }

}
