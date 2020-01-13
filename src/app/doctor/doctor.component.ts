import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AppDataService} from '../app-data.service';
import {Subscription, fromEventPattern} from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  doctor: any;
  doctorId:string;
  private routeSub: Subscription;

  constructor(private appDataService: AppDataService, private route: ActivatedRoute) 
  {
      
   }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {      
      this.doctorId = params['id'];
      this.doctor = this.appDataService.GetDoctorById(this.doctorId);
    });
  }

  OnFormSubmit(ngForm: NgForm){
    
    console.log(ngForm.value);

    const frmValue = ngForm.value;

    var drCount= this.appDataService.GetDoctors().length;

    var newDoctor = {FirstName: frmValue.drFirstName, LastName: frmValue.drLastName, Email: frmValue.drEmail, Phone: frmValue.drPhone, Id: (drCount+1).toString() };

    this.appDataService.AddDoctor(newDoctor);
  }

}
