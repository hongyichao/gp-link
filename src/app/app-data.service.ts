import {Injectable, RootRenderer} from '@angular/core';

@Injectable({
providedIn: 'root',
})
export class AppDataService {
    // tslint:disable-next-line: max-line-length
    private doctors: Doctor[] = [{Id: '1', FirstName: 'Lucas1', LastName: 'Chao', Email: 'lchao1@gmail.com', Phone: '0404123456', Gender: 'male'}
    , {Id: '2', FirstName: 'Lucas2', LastName: 'Chao', Email: 'lchao2@gmail.com', Phone: '0404123457', Gender: 'female'}
    , {Id: '3', FirstName: 'Lucas3', LastName: 'Chao', Email: 'lchao3@gmail.com', Phone: '0404123458', Gender: 'male'}];

    GetDoctors(): Doctor[] {
        return this.doctors;
    }

    GetDoctorById(id: string): Doctor {
        return this.doctors.slice(+id - 1)[0];
    }

    AddDoctor(newDoctor: Doctor) {
        this.doctors.push(newDoctor);
    }
}

export class Doctor {
    public Id: string;
  public FirstName: string;
  public LastName: string;
  public Email: string;
  public Phone: string ;
  public Gender: string;
}
