import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {AppDataService} from '../app-data.service';
import {Subscription, fromEventPattern} from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit
{
  @ViewChild('f',  {static: false}) drForm: NgForm;
  doctor: any;
  doctorId:string;
  private routeSub: Subscription;

  constructor(private appDataService: AppDataService, private route: ActivatedRoute)
  {

   }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(
      (params: Params) => {
      this.doctorId = params['id'];
      this.doctor = this.appDataService.GetDoctorById(this.doctorId);
    });
  }

  OnFormSubmit(ngForm: NgForm){

    console.log(ngForm.value);

    const frmValue = ngForm.value;

    var drCount= this.appDataService.GetDoctors().length;

    var newDoctor = {FirstName: frmValue.drFirstName, LastName: frmValue.drLastName, Email: frmValue.drEmail, Phone: frmValue.drPhone, Id: (drCount+1).toString(), Gender:"male" };

    this.appDataService.AddDoctor(newDoctor);
  }

  OnResetForm()
  {
    this.drForm.reset();

  }

}
