import { Injectable } from '@angular/core';
import {CanActivate, Router, Route,  ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute} from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../auth.service';


@Injectable({
providedIn: 'root'
})
export class DoctorAuthGuard implements CanActivate {
    allowActivate: boolean;

    constructor(private router: Router,
      private route: ActivatedRoute,
      private authService: AuthService) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        this.authService.IsLoggedIn.subscribe(isLoggedIn => {
          if (isLoggedIn) {
            const userType = this.authService.loggedInUser.Type;
            if (isLoggedIn && (userType === 'doctor' || userType === 'admin')) {
              this.allowActivate = isLoggedIn;
            }
          }
        });

        if (this.allowActivate) {
            return true;
        }

        this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
        return false;
    }
}
