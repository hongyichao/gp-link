import { Component, OnInit } from '@angular/core';
import { Appointment } from '../shared-models/app.appointment';
import { AppDataService } from '../app-data.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  appointments: Appointment[];
  constructor(private dataService: AppDataService, private authService: AuthService) { }

  ngOnInit(): void {
    const user = this.authService.loggedInUser;

    if (user.Type === 'doctor') {
      this.appointments = this.dataService.getAppointmentsForDoctor(user.Id);
    } else if (user.Type === 'patient') {
      this.appointments = this.dataService.getAppointmentsForPatient(user.Id);
    } else if (user.Type === 'admin') {
      this.appointments = this.dataService.getAllAppointments();
    } else {
      this.appointments = [];
    }
  }
}
