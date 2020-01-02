import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit 
{

  doctorFound:string = "";
  doctors: Array<Doctor>;

  constructor() 
  { 
this.doctors = new Array<Doctor>();

     let d1: Doctor = new Doctor();
     d1.FirstName = "Hongyi";
     d1.LastName = "Chao";
     d1.Phone = "12232";
     d1.Email = "lucashyc@gmail.com";
      
     this.doctors.push(d1);

let d2: Doctor  = {
  FirstName:"Lucas",
  LastName:"Chao",
  Email:"lucashyc@gmail.com",
  Phone:"0404610535"
    };

     this.doctors.push(
     d2);

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
}
