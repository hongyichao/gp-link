import {Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import {Doctor} from './shared-models/app.doctor';
import { Patient } from './shared-models/app.patient';
import { Appointment } from './shared-models/app.appointment';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { AuthService } from './auth.service';

@Injectable({
providedIn: 'root',
})
export class AppDataService {
    doctorsChanged = new Subject<Doctor[]>();

    private appointments: Appointment[];
    private patients: Patient[];
    private doctors: Doctor[];

    constructor() {
      const storageDoctors = sessionStorage.getItem('gpDoctors');
      this.doctors = storageDoctors ? JSON.parse(storageDoctors) : [];

      if (this.doctors.length === 0) {
        this.doctors = [
          {Id: 2, FirstName: 'Doctor', LastName: 'Doctor', Email: 'dd@gmail.com', Phone: '0404987654'},
          {Id: 4, FirstName: 'Lucas', LastName: 'Chao', Email: 'lchao@gmail.com', Phone: '0404123456', Gender: 'male', Rating: 7},
          {Id: 5, FirstName: 'Terry', LastName: 'Farrell', Email: 'tfarrell@gmail.com', Phone: '0404123457', Gender: 'female', Rating: 7},
          {Id: 6, FirstName: 'Jane', LastName: 'Fonda', Email: 'jfonda@gmail.com', Phone: '0404123458', Gender: 'female', Rating: 7},
          {Id: 7, FirstName: 'Helen', LastName: 'Keller', Email: 'hhelenk@gmail.com', Phone: '0414123459', Gender: 'female', Rating: 7},
          {Id: 8, FirstName: 'Johnny', LastName: 'Depp', Email: 'jdepp@gmail.com', Phone: '0414567459', Gender: 'male', Rating: 9},
          {Id: 9, FirstName: 'Mark', LastName: 'Zuck', Email: 'markz@gmail.com', Phone: '0414569959', Gender: 'male', Rating: 8},
          {Id: 10, FirstName: 'Andrew', LastName: 'Jackson', Email: 'ajackson@gmail.com', Phone: '0414568859', Gender: 'male', Rating: 8},
          {Id: 11, FirstName: 'Alexandra', LastName: 'Daddario', Email: 'alexandrad@gmail.com', Phone: '0414567759', Gender: 'female', Rating: 7},
          {Id: 12, FirstName: 'Jemma', LastName: 'Murphy', Email: 'jmurphy@gmail.com', Phone: '0414567659', Gender: 'female', Rating: 10},
          {Id: 13, FirstName: 'Jemma', LastName: 'Bridge', Email: 'jbridge@gmail.com', Phone: '0414555759', Gender: 'female', Rating: 6},
          {Id: 14, FirstName: 'Vicent', LastName: 'Stanley', Email: 'vstanley@gmail.com', Phone: '0414544759', Gender: 'male', Rating: 5}
        ];
      }

      const storagePatients = sessionStorage.getItem('gpPatients');
      this.patients = storagePatients ? JSON.parse(storagePatients) : [];

      if (this.patients.length === 0) {
        // this.patients = [];
        this.patients = [
          {Id: 3, FirstName: 'Patient', LastName: 'Patient', Email: 'pp@gmail.com', Phone: '0404876543'},
          {Id: 15, FirstName: 'John', LastName: 'Xu', Email: 'johnx@gmail.com', Phone: '0404123456'},
          {Id: 16, FirstName: 'Michael', LastName: 'Graves', Email: 'michaelg@gmail.com', Phone: '0404123457'},
          {Id: 17, FirstName: 'Taylor', LastName: 'Swift', Email: 'taylors@outlook.com', Phone: '0404123458', Gender: 'female'}
        ];
      }

      const storageAppointments = sessionStorage.getItem('gpAppointments');
      this.appointments = storageAppointments ? JSON.parse(storageAppointments) : [];
      if (this.appointments.length === 0) {
        this.appointments = [
          { Id: 1, DateTime: new Date(2020, 6, 13), doctorId: 2, patientId: 3},
          { Id: 2, DateTime: new Date(2020, 6, 10), doctorId: 4, patientId: 15},
          { Id: 3, DateTime: new Date(2020, 7, 10), doctorId: 5, patientId: 16},
          { Id: 4, DateTime: new Date(2020, 7, 11), doctorId: 6, patientId: 17},
          { Id: 5, DateTime: new Date(2020, 7, 12), doctorId: 7, patientId: 15},
          { Id: 6, DateTime: new Date(2020, 7, 13), doctorId: 8, patientId: 16},
          { Id: 7, DateTime: new Date(2020, 7, 14), doctorId: 9, patientId: 17},
          { Id: 8, DateTime: new Date(2020, 6, 14), doctorId: 10, patientId: 16},
          { Id: 9, DateTime: new Date(2020, 6, 13), doctorId: 11, patientId: 15},
          { Id: 10, DateTime: new Date(2020, 6, 12), doctorId: 12, patientId: 16},
          { Id: 11, DateTime: new Date(2020, 6, 11), doctorId: 13, patientId: 17},
          { Id: 12, DateTime: new Date(2020, 6, 10), doctorId: 14, patientId: 15},
        ];
      }

    }

    GetDoctors(): Doctor[] {
      if (this.doctors.length > 0) {
        return this.doctors.slice();
      }
    }

    GetPatients(): Patient[] {
      if (this.patients.length > 0) {
        return this.patients.slice();
      }
    }

    GetDoctorById(id: number): Doctor {
        return this.doctors.find(d => d.Id === id);
    }

    GetPatientById(id: number): Patient {
      return this.patients.find(p => p.Id === id);
    }

    AddDoctor(newDoctor: Doctor): number {
        this.doctors.push(newDoctor);
        this.doctorsChanged.next(this.doctors.slice());

        sessionStorage.setItem('gpDoctors', JSON.stringify(this.doctors));

        console.log(this.doctors);
        return newDoctor.Id;
    }

    updateDoctor(doctor: Doctor) {
      const index = this.doctors.findIndex(d => d.Id === +doctor.Id);
      this.doctors[index] = doctor;
      this.doctorsChanged.next(this.doctors.slice());
    }

    AddPatient(newPatient: Patient) {
      this.patients.push(newPatient);
      sessionStorage.setItem('gpPatients', JSON.stringify(this.patients));
      console.log(this.patients);
    }

    getAppointmentsForPatient(id: number) {
      return this.appointments.filter(a => a.patientId === id);
    }

    getAppointmentsForDoctor(id: number) {
      return this.appointments.filter(a => a.doctorId === id);
    }

    getAllAppointments() {
      return this.appointments;
    }
}

