import { Component, OnInit, OnDestroy } from '@angular/core';
import {AppDataService} from '../app-data.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject, Subscription, throwError } from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from '../shared/alert-modal/alert-modal.component';
import {Doctor} from '../shared-models/app.doctor';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit, OnDestroy {
  doctorFound: string;
  doctors: Array<Doctor>;
  selectedDoctorName: string;
  error = null;
  error2 = null;
  errorSubject = new Subject();
  errorSubscription: Subscription;
  dataSubscription: Subscription;
  isAlertVisible = false;

  constructor(
    private appDataService: AppDataService,
    private httpClient: HttpClient,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) {

    this.selectedDoctorName = '';
  }

  ngOnInit() {
    this.doctors = this.appDataService.GetDoctors();
    this.GetDrsFromServer();
    this.dataSubscription = this.appDataService.doctorsChanged.subscribe(
      (doctors: Doctor[]) => {
        this.doctors = doctors;
      }
    );

    this.errorSubscription = this.errorSubject.subscribe(errorMsg => {
        this.error2 = errorMsg;
      });

  }

  private GetDrsFromServer() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('FirstName', 'Lucas');
    searchParams = searchParams.append('LastName', 'Chao');

    this.httpClient.get('https://gplink-api.firebaseio.com/doctors.json',
      {
        headers: new HttpHeaders({'auth-token': 'xyzuguess'}),
        params: searchParams
      }
    )
    .pipe(map(responseData => {
      const postArray = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          const respData = responseData[key];
          const aDoctor: Doctor = {
            Id: null,
            FirstName: respData.firstName,
            LastName: respData.lastName,
            Email: respData.email,
            Phone: respData.phone,
            Gender: null
          };


          postArray.push(aDoctor);
        }
      }
      return postArray;
    }))
    .pipe(catchError(errorRes => {
      errorRes.message = errorRes.message + 'Angular Bon Bon';
      return throwError(errorRes);
    }))
    .subscribe(doctors => {
      console.log(doctors);

      for (let i = 0; i < doctors.length; i++) {
        this.appDataService.AddDoctor(doctors[i]);
      }

    }, error => {
      this.error = error.message;
      this.errorSubject.next(error.message);
    });
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
    this.dataSubscription.unsubscribe();
  }

  OnAddDoctor() {
    this.router.navigate(['new'], {relativeTo: this.route});
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

  getAwsDoctors() {
    this.authService.getAuthenticatedUser().getSession((err, session) => {
      if (err) {
        return;
      } else {
        this.httpClient.get(
          'https://b3364191vg.execute-api.us-east-1.amazonaws.com/dev/users/doctors'
        ).subscribe(response => {
          console.log(response);
        });

      }

    });
  }

  addAwsDoctors() {

    const newDoctor = {FirstName: 'Terry', LastName: 'C', Email: 'tc@gmail.com', Phone: '12345678'};

    this.httpClient.post(
      'https://b3364191vg.execute-api.us-east-1.amazonaws.com/dev/users/doctors', newDoctor
    ).subscribe(response => {
      console.log(response);
    });
  }
}
