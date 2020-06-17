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
  loggedInUser: AppUser;
  userRole: string;

  selectedDoctor;
  selectedPatient;

  appointment: Appointment;

  appointmentTimeList = [{Hour: '09', Minute: '00'},
  {Hour: '10', Minute: '00'},
  {Hour: '11', Minute: '00'},
  {Hour: '12', Minute: '00'},
  {Hour: '13', Minute: '00'},
  {Hour: '14', Minute: '00'},
  {Hour: '15', Minute: '00'},
  {Hour: '16', Minute: '00'},
  {Hour: '17', Minute: '00'},
  {Hour: '18', Minute: '00'}
];

  appointmentForm = new FormGroup({
    doctorName: new FormControl(null),
    doctorId: new FormControl(null),
    patientName: new FormControl(null),
    patientId: new FormControl(null),
    appointmentDateTime: new FormControl(null)
  });

  selectedDate = '';
  selectedTime = '';

  constructor(public activeModal: NgbActiveModal, private dataService: AppDataService, private authService: AuthService) {}

  ngOnInit(): void {
    if (this.id) {
      this.editMode = 'delete';
      this.appointment = this.dataService.getAppointmentById(this.id);
      this.appointmentForm.get('doctorName').setValue(this.appointment?.DoctorName);
      this.appointmentForm.get('patientName').setValue(this.appointment?.PatientName);
      this.appointmentForm.get('appointmentDateTime').setValue(this.appointment?.DateTime.toDateString());
    } else {
      this.editMode = 'add';
      this.patients = this.dataService.GetPatients();
      this.doctors = this.dataService.GetDoctors();
      this.loggedInUser = this.authService.loggedInUser;
      this.userRole = this.loggedInUser.Type;

      if (this.userRole === 'patient') {
        this.appointmentForm.get('patientId').setValue(this.loggedInUser.Id);
      }

      if (this.userRole === 'doctor') {
        this.appointmentForm.get('doctorId').setValue(this.loggedInUser.Id);
      }
    }
  }

  onAppointmentFormSubmit() {

    if (this.editMode === 'delete') {
      this.dataService.cancelAppointment(this.appointment.Id);

    } else {
      const frmVal = this.appointmentForm.value;

      const selectedDoctor = this.doctors.find(d => d.Id === +frmVal.doctorId);
      const selectedPatient = this.patients.find(p => p.Id === +frmVal.patientId);

      const newAppointment: Appointment = {
        Id: null,
        DoctorId: frmVal.doctorId,
        DoctorName: selectedDoctor.FirstName + ' ' + selectedDoctor.LastName,
        PatientId: frmVal.patientId,
        PatientName: selectedPatient.FirstName + ' ' + selectedPatient.LastName,
        DateTime: new Date(frmVal.appointmentDateTime)
      };

      this.dataService.addAppointment(newAppointment);
    }

    this.activeModal.close('Close click');
  }

  appointmentDateChanged(event) {
    console.log('date:' + JSON.stringify(event));
    if (event) {
      this.selectedDate = event.year + '-' + event.month + '-' + event.day;
      this.appointmentForm.get('appointmentDateTime').setValue(this.selectedDate + ' ' + this.selectedTime);
    }
  }

  onTimeChanged(time: string) {
    this.selectedTime = time;
    this.appointmentForm.get('appointmentDateTime').setValue(this.selectedDate + ' ' + this.selectedTime);
  }
}
