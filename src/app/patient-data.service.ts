import {Injectable} from '@angular/core'

@Injectable({
providedIn:'root',
})
export class PatientDataService
{
    private patients: Patient[] = [{Id: "1", FirstName:"Lucas1", LastName:"Chao", Email:"lchao1@gmail.com", Phone:"0404123456", Gender:"male"}
    ,{Id: "2", FirstName:"Lucas2", LastName:"Chao", Email:"lchao2@gmail.com", Phone:"0404123457", Gender:"female"}
    ,{Id: "3", FirstName:"Lucas3", LastName:"Chao", Email:"lchao3@gmail.com", Phone:"0404123458", Gender:"male"}];

    GetPatients(): Patient[]{
        return this.patients;
    }

    GetPatientById(id: string): Patient{
        return this.patients.slice(+id-1)[0];
    }

    AddDoctor(newPatient: Patient)
    {
        this.patients.push(newPatient);
    }
}

export class Patient
{
    public Id: string;
  public FirstName: string;
  public LastName: string;
  public Email: string;
  public Phone: string ;
  public Gender: string;
}
