import { Component, OnInit } from '@angular/core';
import { AppUser } from '../shared-models/app.user';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  appUser: AppUser;
  userId: number;

  userForm = new FormGroup({
    firstName : new FormControl(null, Validators.required),
    lastName : new FormControl(null, Validators.required),
    username : new FormControl(null, Validators.required),
    password : new FormControl(null, Validators.required)
  });

  constructor(private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = +this.route.snapshot.params['id'];
    if (this.userId) {
      this.appUser = this.authService.getUserById(this.userId);
    }

    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      if (this.userId) {
        this.appUser = this.authService.getUserById(this.userId);
        this.userForm.get('firstName').setValue(this.appUser.FirstName);
        this.userForm.get('lastName').setValue(this.appUser.LastName);
        this.userForm.get('username').setValue(this.appUser.Username);
        this.userForm.get('password').setValue(this.appUser.Password);
      }
    });
  }

  onUserFormSubmit() {

  }
}
