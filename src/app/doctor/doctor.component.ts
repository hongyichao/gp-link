import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {AppDataService} from '../app-data.service';
import {Subscription, fromEventPattern} from 'rxjs';
import { NgForm } from '@angular/forms';
import {Doctor} from '../shared-models/app.doctor';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit, AfterViewInit
{
  @ViewChild('f') drForm: NgForm;
  doctor?: Doctor;
  doctorId: number;
  editMode = false;
  private routeSub: Subscription;

  constructor(private appDataService: AppDataService, private route: ActivatedRoute)
  {

  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(
      (params: Params) => {
      this.doctorId = params['id'];
      if (this.doctorId) {
        this.doctor = this.appDataService.GetDoctorById(+this.doctorId);
        this.editMode = true;
      } else {
        this.doctor = null;
      }
    });

  }

  ngAfterViewInit() {
  }

  private initForm() {

  }

  OnFormSubmit(ngForm: NgForm) {
    console.log(ngForm.value);

    const frmValue = ngForm.value;

    const aDoctor: Doctor = {
      Id: null,
      FirstName: frmValue.drFirstName,
      LastName: frmValue.drLastName,
      Email: frmValue.drEmail,
      Phone: frmValue.drPhone,
      Gender: null
    };

    if (this.editMode) {
      aDoctor.Id = this.doctor.Id;
      this.appDataService.updateDoctor(aDoctor);
    } else {
      this.doctorId = this.appDataService.AddDoctor(aDoctor);
      this.editMode = true;
    }

  }

  OnResetForm() {
    this.drForm.reset();
  }



}
