import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { AppDataService } from 'src/app/app-data.service';
import { Appointment } from 'src/app/shared-models/app.appointment';
import { Patient } from 'src/app/shared-models/app.patient';
import { Doctor } from 'src/app/shared-models/app.doctor';
import { AuthService } from 'src/app/auth.service';
import { AppUser } from 'src/app/shared-models/app.user';

@Component({
  selector: 'app-appointment-model',
  templateUrl: './appointment-model.component.html',
  styleUrls: ['./appointment-model.component.css']
})
export class AppointmentModelComponent implements OnInit {

  @Input() id: number;
  editMode = 'add';

  patients: Patient[];
  doctors: Doctor[];
  activeUser: AppUser;

  selectedDoctor;
  selectedPatient;

  appointment: Appointment;

  appointmentForm = new FormGroup({
    doctorName: new FormControl(null),
    doctorId: new FormControl(null),
    patientName: new FormControl(null),
    patientId: new FormControl(null),
    appointmentDateTime: new FormControl(null)
  });

  constructor(public activeModal: NgbActiveModal, private dataService: AppDataService, private authService: AuthService) {}

  ngOnInit(): void {
    this.patients = this.dataService.GetPatients();
    this.doctors = this.dataService.GetDoctors();
    this.activeUser = this.authService.loggedInUser;

    if (this.id) {
      this.editMode = 'delete';
      this.appointment = this.dataService.getAppointmentById(this.id);
      this.appointmentForm.get('doctorName').setValue(this.appointment?.doctorName);
      this.appointmentForm.get('patientName').setValue(this.appointment?.patientName);
      this.appointmentForm.get('appointmentDateTime').setValue(this.appointment?.DateTime.toDateString());
    } else {
      this.editMode = 'add';
    }
  }

  onAppointmentFormSubmit() {

    if (this.editMode === 'delete') {
      this.dataService.cancelAppointment(this.appointment.Id);
      this.activeModal.close('Close click');
    } else {
      const frmVal = this.appointmentForm.value;
      // this.appointment.doctorId = frmVal.doctorId;
      // this.appointment.patientId = frmVal.patientId;
      console.log(frmVal);
    }

  }
}
