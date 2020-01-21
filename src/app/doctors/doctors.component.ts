import { Component, OnInit } from '@angular/core';
import {AppDataService} from '../app-data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit
{
  doctorFound: string;
  doctors: Array<Doctor>;
  selectedDoctorName: string;

  constructor(private appDataService: AppDataService, private httpClient: HttpClient) {
    this.doctors = appDataService.GetDoctors();
    this.selectedDoctorName = '';
  }

  ngOnInit() {
  }

  onCreateDoctor(newDoctor: {firstName: string, lastName: string, email: string, phone: string}) {

    newDoctor = {firstName: 'Terry', lastName: 'C', email: 'tc@gmail.com', phone: '12345678'};

    this.httpClient.post('https://gplink-api.firebaseio.com/doctors.json', newDoctor).subscribe(response => {
      console.log(response);
    });

  }

  onGetDoctors() {
    this.httpClient.get('https://gplink-api.firebaseio.com/doctors.json').subscribe(doctors => {
    console.log(doctors);
    });
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
