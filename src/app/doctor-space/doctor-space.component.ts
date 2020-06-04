import { Component, OnInit } from '@angular/core';
import { AppDataService } from '../app-data.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Doctor } from '../shared-models/app.doctor';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-doctor-space',
  templateUrl: './doctor-space.component.html',
  styleUrls: ['./doctor-space.component.css']
})
export class DoctorSpaceComponent implements OnInit {
  doctor: any;
  doctorId: number;
  private routeSub: Subscription;

  constructor(private appDataService: AppDataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(
      (params: Params) => {
      this.doctorId = params['id'];
      if (this.doctorId) {
        this.doctor = this.appDataService.GetDoctorById(this.doctorId);
      } else {
        this.doctor = {};
      }
    });
  }

  OnFormSubmit(frm: NgForm) {

  }
}
