import { Component, OnInit, OnDestroy } from '@angular/core';
import {AppDataService} from '../app-data.service';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit, OnDestroy
{
  doctorFound: string;
  doctors: Array<Doctor>;
  selectedDoctorName: string;
  error = null;
  error2 = null;
  errorSubject = new Subject();
  errorSubscription: Subscription;

  constructor(private appDataService: AppDataService, private httpClient: HttpClient) {
    this.doctors = appDataService.GetDoctors();
    this.selectedDoctorName = '';
  }

  ngOnInit() {

    this.errorSubscription = this.errorSubject.subscribe(errorMsg => {
        this.error2 = errorMsg;
      });

  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }

  onCreateDoctor(newDoctor: {firstName: string, lastName: string, email: string, phone: string}) {

    newDoctor = {firstName: 'Terry', lastName: 'C', email: 'tc@gmail.com', phone: '12345678'};

    this.httpClient.post('https://gplink-api.firebaseio.com/doctors.json', newDoctor).subscribe(response => {
      console.log(response);
    });

  }

  onGetDoctors() {
    this.httpClient.get('https://gplink-api.firebaseio.com/doctors.json')
    .pipe(catchError(errorRes => {

      errorRes.message = errorRes.message + 'Angular Bon Bon';
      return throwError(errorRes);
    }))
    .subscribe(doctors => {
    console.log(doctors);
    }, error => {
      this.error = error.message;
      this.errorSubject.next(error.message);
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
