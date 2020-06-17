import {Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import {Doctor} from './shared-models/app.doctor';
import { Patient } from './shared-models/app.patient';
import { Appointment } from './shared-models/app.appointment';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { AuthService } from './auth.service';
import { AppUserService } from './app-user.service';
import { AppointmentComponent } from './appointment/appointment.component';

@Injectable({
providedIn: 'root',
})
export class AppDataService {
    doctorsChanged = new Subject<Doctor[]>();

    private appointments: Appointment[];
    private patients: Patient[];
    private doctors: Doctor[];

    constructor(private userService: AppUserService) {
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
          { Id: 1, DateTime: new Date(2020, 6, 13), DoctorId: 2, DoctorName: 'Doctor Doctor', PatientId: 3, PatientName: 'Patient Patient'},
          { Id: 2, DateTime: new Date(2020, 6, 10), DoctorId: 4, DoctorName: 'Lucas Chao', PatientId: 15, PatientName: 'John'},
          { Id: 3, DateTime: new Date(2020, 7, 10), DoctorId: 5, DoctorName: 'Terry', PatientId: 16, PatientName: 'Michael'},
          { Id: 4, DateTime: new Date(2020, 7, 11), DoctorId: 6, DoctorName: 'Jane', PatientId: 17, PatientName: 'Taylor'},
          { Id: 5, DateTime: new Date(2020, 7, 12), DoctorId: 7, DoctorName: 'Helen', PatientId: 15, PatientName: 'John'},
          { Id: 6, DateTime: new Date(2020, 7, 13), DoctorId: 8, DoctorName: 'Johnny', PatientId: 16, PatientName: 'Michael'},
          { Id: 7, DateTime: new Date(2020, 7, 14), DoctorId: 9, DoctorName: 'Mark', PatientId: 17, PatientName: 'Taylor'},
          { Id: 8, DateTime: new Date(2020, 6, 14), DoctorId: 10, DoctorName: 'Andrew', PatientId: 16, PatientName: 'Michael'},
          { Id: 9, DateTime: new Date(2020, 6, 13), DoctorId: 11, DoctorName: 'Alexandra', PatientId: 15, PatientName: 'John'},
          { Id: 10, DateTime: new Date(2020, 6, 12), DoctorId: 12, DoctorName: 'Jemma', PatientId: 16, PatientName: 'Michael'},
          { Id: 11, DateTime: new Date(2020, 6, 11), DoctorId: 13, DoctorName: 'Jemma', PatientId: 17, PatientName: 'Taylor'},
          { Id: 12, DateTime: new Date(2020, 6, 10), DoctorId: 14, DoctorName: 'Vicent', PatientId: 15, PatientName: 'John'},
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
    updateDoctorInfo(doctor: Doctor) {
      const index = this.doctors.findIndex(d => d.Id === +doctor.Id);
      this.doctors[index] = doctor;
      this.doctorsChanged.next(this.doctors.slice());

      sessionStorage.setItem('gpDoctors', JSON.stringify(this.doctors));
    }

    updateDoctor(doctor: Doctor) {
      const index = this.doctors.findIndex(d => d.Id === +doctor.Id);
      this.doctors[index] = doctor;
      this.doctorsChanged.next(this.doctors.slice());

      this.updateDoctorAccount(doctor);

      sessionStorage.setItem('gpDoctors', JSON.stringify(this.doctors));
    }

    updateDoctorAccount(doctor: Doctor) {
      const theUser = this.userService.getUserById(doctor.Id);

      theUser.FirstName = doctor.FirstName;
      theUser.LastName = doctor.LastName;
      this.userService.updateUser(theUser);
    }

    AddPatient(newPatient: Patient) {
      this.patients.push(newPatient);
      sessionStorage.setItem('gpPatients', JSON.stringify(this.patients));
      console.log(this.patients);
    }

    updatePatientInfo(patient: Patient) {
      const index = this.patients.findIndex(d => d.Id === +patient.Id);
      this.patients[index] = patient;

      sessionStorage.setItem('gpPatients', JSON.stringify(this.patients));
    }

    updatePatient(patient: Patient) {
      const index = this.patients.findIndex(d => d.Id === +patient.Id);
      this.patients[index] = patient;

      this.updatePatientAccount(patient);

      sessionStorage.setItem('gpPatients', JSON.stringify(this.patients));
    }

    updatePatientAccount(patient: Doctor) {
      const theUser = this.userService.getUserById(patient.Id);

      theUser.FirstName = patient.FirstName;
      theUser.LastName = patient.LastName;
      this.userService.updateUser(theUser);
    }

    addAppointment(newAppointment: Appointment) {
      const id = this.appointments.length === 0 ? 1 : this.appointments[this.appointments.length - 1].Id + 1;
      newAppointment.Id = id;
      this.appointments.push(newAppointment);

      console.log(this.appointments);
    }

    cancelAppointment(id: number) {
      const index = this.appointments.findIndex(a => a.Id === id);
      this.appointments.splice(index, 1);
    }

    getAppointmentById(id: number) {
      return this.appointments.find(a => a.Id === id);
    }

    getAppointmentsForPatient(id: number) {
      return this.appointments.filter(a => a.PatientId === id);
    }

    getAppointmentsForDoctor(id: number) {
      return this.appointments.filter(a => a.DoctorId === id);
    }

    getAllAppointments() {
      return this.appointments;
    }
}

