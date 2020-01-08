import { Injectable } from '@angular/core';
import {CanActivate, Router, Route,  ActivatedRouteSnapshot, RouterStateSnapshot,} from '@angular/router';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';


@Injectable({
providedIn:'root'
})
export class AuthGuard implements CanActivate 
{
    constructor(private loginService: LoginService, private router: Router)
    {

    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<boolean> | Promise<boolean> | boolean
    {
        if(this.loginService.IsLoggedIn){

            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}