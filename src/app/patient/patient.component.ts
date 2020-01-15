import { Component, OnInit } from '@angular/core';
import { PatientDataService } from '../patient-data.service';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit 
{
  patient:any;
  constructor(private dataService: PatientDataService, private route: ActivatedRoute) { }
  
  patientForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl()
  });

  ngOnInit() 
  {
    this.route.params.subscribe(params=>
    {
      let patientId = params["id"];
      let tmp = this.dataService.GetPatientById(patientId);
      this.patient = tmp;
    });
  }

  onPatientFormSubmit()
  {
    console.log(this.patientForm.value);
  }

}
