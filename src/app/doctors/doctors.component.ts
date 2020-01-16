import { Component, OnInit } from '@angular/core';
import {AppDataService} from '../app-data.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit 
{
  doctorFound:string = "";
  doctors: Array<Doctor>;

  constructor(private appDataService: AppDataService) 
  { 
    this.doctors = appDataService.GetDoctors();
  }

  ngOnInit() {
  }

}

export class Doctor
{
  public FirstName: string;
  public LastName: string;
  public Email: string;  
  public Phone: string ;
  public Gender: string;
}
