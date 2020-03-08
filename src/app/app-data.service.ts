import {Injectable, RootRenderer} from '@angular/core';
import { Subject } from 'rxjs';
import {Doctor} from './shared/doctor.model';

@Injectable({
providedIn: 'root',
})
export class AppDataService {
    doctorsChanged = new Subject<Doctor[]>();

    private doctors: Doctor[] = [
      {Id: '1', FirstName: 'Lucas1', LastName: 'Chao', Email: 'lchao1@gmail.com', Phone: '0404123456', Gender: 'male'},
      {Id: '2', FirstName: 'Lucas2', LastName: 'Chao', Email: 'lchao2@gmail.com', Phone: '0404123457', Gender: 'female'},
      {Id: '3', FirstName: 'Lucas3', LastName: 'Chao', Email: 'lchao3@gmail.com', Phone: '0404123458', Gender: 'male'}];

    GetDoctors(): Doctor[] {
        return this.doctors.slice();
    }

    GetDoctorById(id: string): Doctor {
        return this.doctors.slice(+id - 1)[0];
    }

    AddDoctor(newDoctor: Doctor): string {
        newDoctor.Id = this.doctors.length + 1 + '';
        this.doctors.push(newDoctor);
        this.doctorsChanged.next(this.doctors.slice());
        return newDoctor.Id;
    }

    updateDoctor(doctor: Doctor) {
      this.doctors[+doctor.Id - 1] = doctor;
      this.doctorsChanged.next(this.doctors.slice());
    }
}

