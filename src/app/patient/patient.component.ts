import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { AppDataService } from '../app-data.service';
import { AppUserService } from '../app-user.service';
import { Patient } from '../shared-models/app.patient';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit
{
  patient: Patient;
  genders=['male', 'female'];

  get patientNoteControls() {
    return (this.patientForm.get('notes') as FormArray).controls;

  }

  constructor(private dataService: AppDataService,
    private route: ActivatedRoute,
    private userService: AppUserService) { }

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
      if (patientId) {
        this.patient = this.dataService.GetPatientById(+patientId);
        this.patientForm.get('firstName').setValue(this.patient?.FirstName);
        this.patientForm.get('lastName').setValue(this.patient?.LastName);
        this.patientForm.get('email').setValue(this.patient?.Email);
        this.patientForm.get('gender').setValue(this.patient?.Gender);
      }
    });
  }

  onPatientFormSubmit() {
    console.log(this.patientForm.value);
    const frmVal = this.patientForm.value;
    this.patient.FirstName = frmVal.firstName;
    this.patient.LastName = frmVal.lastName;
    this.patient.Email = frmVal.email;
    this.patient.Gender = frmVal.gender;
    this.dataService.updatePatient(this.patient);
  }

  onAddNotes()
  {
    const control = new FormControl(null);
    (<FormArray>this.patientForm.get('notes')).push(control);
  }

}
