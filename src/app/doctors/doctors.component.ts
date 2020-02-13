import { Component, OnInit, OnDestroy } from '@angular/core';
import {AppDataService} from '../app-data.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject, Subscription, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from '../shared/alert-modal/alert-modal.component';

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
  isAlertVisible = false;

  constructor(private appDataService: AppDataService, private httpClient: HttpClient, private modalService: NgbModal
    ) {
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

  onCreateDoctor() {

    const newDoctor = {firstName: 'Terry', lastName: 'C', email: 'tc@gmail.com', phone: '12345678'};

    this.httpClient.post(
      'https://gplink-api.firebaseio.com/doctors.json', newDoctor,
      {
        headers: new HttpHeaders({'auth-token': 'xyzuguess'})
      }
    ).subscribe(response => {
      console.log(response);
    });

  }

  onGetDoctors() {
      let searchParams = new HttpParams();
      searchParams = searchParams.append('FirstName', 'Lucas');
      searchParams = searchParams.append('LastName', 'Chao');

      this.httpClient.get('https://gplink-api.firebaseio.com/doctors.json',
        {
          headers: new HttpHeaders({'auth-token': 'xyzuguess'}),
          params: searchParams
        }
      )
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

  showAlert() {
    if (this.isAlertVisible) {
      this.isAlertVisible = false;
    } else {
      this.error = 'Hello! how are you?';
      this.isAlertVisible = true;
    }
  }

  showAlertModal() {
    const modalRef = this.modalService.open(AlertModalComponent);
    modalRef.componentInstance.name = this.error;
  }

  onHandleAlerClose() {
    this.isAlertVisible = false;
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
