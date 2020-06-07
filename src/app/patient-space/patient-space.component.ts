import { Component, OnInit } from '@angular/core';
import { Patient } from '../shared-models/app.patient';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AppDataService } from '../app-data.service';

@Component({
  selector: 'app-patient-space',
  templateUrl: './patient-space.component.html',
  styleUrls: ['./patient-space.component.css']
})
export class PatientSpaceComponent implements OnInit {
  patient?: Patient;
  constructor(private authService: AuthService, private dataService: AppDataService) { }

  ngOnInit(): void {
    const id = this.authService.loggedInUser.Id;
    this.patient = this.dataService.GetPatientById(id);
  }

  OnFormSubmit(frm: NgForm) {

  }
}
