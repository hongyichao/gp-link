import { Component, OnInit } from '@angular/core';
import { AppDataService } from '../app-data.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Doctor } from '../shared-models/app.doctor';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-doctor-space',
  templateUrl: './doctor-space.component.html',
  styleUrls: ['./doctor-space.component.css']
})
export class DoctorSpaceComponent implements OnInit {
  doctor?: Doctor;
  doctorId: number;
  private routeSub: Subscription;

  constructor(private appDataService: AppDataService,
              private route: ActivatedRoute,
              private authService: AuthService,
              private dataService: AppDataService) {

               }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(
      (params: Params) => {
      this.doctorId = params['id'];
      if (this.doctorId) {
        this.doctor = this.appDataService.GetDoctorById(this.doctorId);
      } else {
        const id = this.authService.loggedInUser.Id;
        this.doctor = this.appDataService.GetDoctorById(id);
        if (!this.doctor) {
          this.doctor = null;
        }
      }
    });
  }

  OnFormSubmit(frm: NgForm) {

    console.log(frm.value);
    const frmVal = frm.value;
    this.doctor.FirstName = frmVal.drFirstName;
    this.doctor.LastName = frmVal.drLastName;
    this.doctor.Email = frmVal.drEmail;
    this.doctor.Phone = frmVal.drPhone;

    this.dataService.updateDoctor(this.doctor);
  }
}
