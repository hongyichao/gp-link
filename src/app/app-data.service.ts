import {Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import {Doctor} from './shared/doctor.model';

@Injectable({
providedIn: 'root',
})
export class AppDataService {
    doctorsChanged = new Subject<Doctor[]>();

    private doctors: Doctor[];

    constructor() {
      const storageDoctors = sessionStorage.getItem('gpDoctors');
      this.doctors = storageDoctors ? JSON.parse(storageDoctors) : [];

      if (this.doctors.length === 0) {
        this.doctors = [
          {Id: '1', FirstName: 'Lucas', LastName: 'Chao', Email: 'lchao@gmail.com', Phone: '0404123456', Gender: 'male'},
          {Id: '2', FirstName: 'Terry', LastName: 'Farrell', Email: 'tfarrell@gmail.com', Phone: '0404123457', Gender: 'female'},
          {Id: '3', FirstName: 'Jane', LastName: 'Fonda', Email: 'jfonda@gmail.com', Phone: '0404123458', Gender: 'female'},
          {Id: '4', FirstName: 'Helen', LastName: 'Keller', Email: 'hhelenk@gmail.com', Phone: '0414123459', Gender: 'female'},
          {Id: '5', FirstName: 'Johnny', LastName: 'Depp', Email: 'jdepp@gmail.com', Phone: '0414567459', Gender: 'male'},
          {Id: '6', FirstName: 'Mark', LastName: 'Zuck', Email: 'markz@gmail.com', Phone: '0414569959', Gender: 'male'},
          {Id: '7', FirstName: 'Andrew', LastName: 'Jackson', Email: 'ajackson@gmail.com', Phone: '0414568859', Gender: 'male'},
          {Id: '8', FirstName: 'Alexandra', LastName: 'Daddario', Email: 'alexandrad@gmail.com', Phone: '0414567759', Gender: 'female'},
          {Id: '9', FirstName: 'Jemma', LastName: 'Murphy', Email: 'jmurphy@gmail.com', Phone: '0414567659', Gender: 'female'},
          {Id: '10', FirstName: 'Jemma', LastName: 'Bridge', Email: 'jbridge@gmail.com', Phone: '0414555759', Gender: 'female'},
          {Id: '11', FirstName: 'Vicent', LastName: 'Stanley', Email: 'vstanley@gmail.com', Phone: '0414544759', Gender: 'male'}
        ];
      }
    }

    GetDoctors(): Doctor[] {
      if(this.doctors.length>0) {
        return this.doctors.slice();
      }
    }

    GetDoctorById(id: string): Doctor {
        return this.doctors.slice(+id - 1)[0];
    }

    AddDoctor(newDoctor: Doctor): string {
        newDoctor.Id = this.doctors.length + 1 + '';
        this.doctors.push(newDoctor);
        this.doctorsChanged.next(this.doctors.slice());

        sessionStorage.setItem('gpDoctors', JSON.stringify(this.doctors));
        return newDoctor.Id;
    }

    updateDoctor(doctor: Doctor) {
      this.doctors[+doctor.Id - 1] = doctor;
      this.doctorsChanged.next(this.doctors.slice());
    }
}

