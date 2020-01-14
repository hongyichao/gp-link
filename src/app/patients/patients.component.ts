import { Component, OnInit } from '@angular/core';
import { PatientDataService } from '../patient-data.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  patients: Array<Patient>;

  constructor(private dataService: PatientDataService) 
  { 

  }

  ngOnInit() {
    this.patients = this.dataService.GetPatients();    
  }


}export class Patient
{
    public Id: string;
  public FirstName: string;
  public LastName: string;
  public Email: string;  
  public Phone: string ;
}
