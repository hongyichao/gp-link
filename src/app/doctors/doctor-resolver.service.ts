import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Doctor } from '../shared-models/app.doctor';
import { AppDataService } from '../app-data.service';

@Injectable ({
  providedIn: 'root'
})
export class DoctorResolverService implements Resolve<Doctor[]> {

  constructor(private appDataService: AppDataService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const doctors = this.appDataService.GetDoctors();
    return doctors;
  }
}
