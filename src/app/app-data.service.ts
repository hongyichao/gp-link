import {Injectable, RootRenderer} from '@angular/core'

@Injectable({
providedIn:'root',
})
export class AppDataService
{
    private doctors: Doctor[] = [{Id: "1", FirstName:"Lucas1", LastName:"Chao", Email:"lchao1@gmail.com", Phone:"0404123456"}
    ,{Id: "2", FirstName:"Lucas2", LastName:"Chao", Email:"lchao2@gmail.com", Phone:"0404123457"}
    ,{Id: "3", FirstName:"Lucas3", LastName:"Chao", Email:"lchao3@gmail.com", Phone:"0404123458"}];

    GetDoctors(): Doctor[]{
        return this.doctors;
    }

    GetDoctorById(id: string): Doctor{
        return this.doctors[+id-1];
    }

    AddDoctor(newDoctor: Doctor)
    {
        this.doctors.push(newDoctor);
    }
}

export class Doctor
{
    public Id: string;
  public FirstName: string;
  public LastName: string;
  public Email: string;  
  public Phone: string ;
}