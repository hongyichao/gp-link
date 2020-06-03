import { Component, OnInit } from '@angular/core';
import { PatientDataService } from '../patient-data.service';
import { Patient } from '../shared-models/app.patient';
import { AppDataService } from '../app-data.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  patients: Array<Patient>;

  constructor(private dataService: AppDataService) {
  }

  ngOnInit() {
    this.patients = this.dataService.GetPatients();
  }
}
