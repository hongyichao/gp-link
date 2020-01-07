import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AppDataService} from '../app-data.service';
import {Subscription} from 'rxjs';

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

}
