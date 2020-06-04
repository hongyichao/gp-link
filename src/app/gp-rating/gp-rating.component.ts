import { Component, OnInit } from '@angular/core';
import { AppDataService } from '../app-data.service';
import { Doctor } from '../shared-models/app.doctor';

@Component({
  selector: 'app-gp-rating',
  templateUrl: './gp-rating.component.html',
  styleUrls: ['./gp-rating.component.css']
})
export class GpRatingComponent implements OnInit {
  doctors: Doctor[];

  constructor(private appDataService: AppDataService) { }

  ngOnInit() {
    this.doctors = this.appDataService.GetDoctors();
  }

}
