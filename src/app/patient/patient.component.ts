import { Component, OnInit } from '@angular/core';
import { PatientDataService } from '../patient-data.service';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit
{
  patient:any;
  genders=['male', 'female'];

  get patientNoteControls() {
    return (this.patientForm.get('notes') as FormArray).controls;

  }

  constructor(private dataService: PatientDataService, private route: ActivatedRoute) { }

  patientForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      gender: new FormControl('male'),
      notes: new FormArray([])
  });

  ngOnInit()
  {
    this.route.params.subscribe(params=>
    {
      let patientId = params['id'];
      this.patient = this.dataService.GetPatientById(patientId);
      this.patientForm.get('firstName').setValue(this.patient.FirstName);
      this.patientForm.get('lastName').setValue(this.patient.LastName);
      this.patientForm.get('email').setValue(this.patient.Email);
      this.patientForm.get('gender').setValue(this.patient.Gender);
    });
  }

  onPatientFormSubmit()
  {
    console.log(this.patientForm.value);
  }

  onAddNotes()
  {
    const control = new FormControl(null);
    (<FormArray>this.patientForm.get('notes')).push(control);
  }

}
