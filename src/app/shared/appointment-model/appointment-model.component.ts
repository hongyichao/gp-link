import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { AppDataService } from 'src/app/app-data.service';
import { Appointment } from 'src/app/shared-models/app.appointment';

@Component({
  selector: 'app-appointment-model',
  templateUrl: './appointment-model.component.html',
  styleUrls: ['./appointment-model.component.css']
})
export class AppointmentModelComponent implements OnInit {

  @Input() id: number;

  appointment: Appointment;

  appointmentForm = new FormGroup({
    doctorName: new FormControl(null),
    patientName: new FormControl(null),
    appointmentDateTime: new FormControl(null)
  });

  constructor(public activeModal: NgbActiveModal, private dataService: AppDataService) {}

  ngOnInit(): void {
    this.appointment = this.dataService.getAppointmentById(this.id);

    this.appointmentForm.get('doctorName').setValue(this.appointment?.doctorName);
    this.appointmentForm.get('patientName').setValue(this.appointment?.patientName);
    this.appointmentForm.get('appointmentDateTime').setValue(this.appointment?.DateTime.toDateString());
  }

  onAppointFormSubmit() {
    this.dataService.cancelAppointment(this.appointment.Id);
    this.activeModal.close('Close click');
  }
}
