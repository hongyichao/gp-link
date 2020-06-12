import { Component, OnInit } from '@angular/core';
import { AppUser } from '../shared-models/app.user';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { AppUserService } from '../app-user.service';
import { AppDataService } from '../app-data.service';
import { Patient } from '../shared-models/app.patient';

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

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private userService: AppUserService,
              private dataService: AppDataService) { }

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
    const frmVal = this.userForm.value;
    this.appUser.FirstName = frmVal.firstName;
    this.appUser.LastName = frmVal.lastName;
    this.appUser.Username = frmVal.username;
    this.appUser.Password = frmVal.password;
    this.userService.updateUser(this.appUser);

    if (this.appUser.Type === 'doctor') {
      const theDoctor = this.dataService.GetDoctorById(this.appUser.Id);
      theDoctor.FirstName = this.appUser.FirstName;
      theDoctor.LastName = this.appUser.LastName;
      this.dataService.updateDoctorInfo(theDoctor);
    }

    if (this.appUser.Type === 'patient') {
      const thePatient = this.dataService.GetPatientById(this.appUser.Id);
      thePatient.FirstName = this.appUser.FirstName;
      thePatient.LastName = this.appUser.LastName;
      this.dataService.updatePatientInfo(thePatient);
    }
  }
}
