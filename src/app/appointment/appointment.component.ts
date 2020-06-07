import { Component, OnInit } from '@angular/core';
import { Appointment } from '../shared-models/app.appointment';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  appointment: Appointment;
  constructor() { }

  ngOnInit(): void {
  }

}
