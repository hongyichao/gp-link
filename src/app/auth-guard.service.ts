import { Injectable } from '@angular/core';
import {CanActivate, Router, Route,  ActivatedRouteSnapshot, RouterStateSnapshot,} from '@angular/router';
import { LoginService } from './login.service';
import { Observable, Subject } from 'rxjs';


@Injectable({
providedIn:'root'
})
export class AuthGuard implements CanActivate 
{
    allowActivate:boolean;

    constructor(private loginService: LoginService, private router: Router)
    {
        
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<boolean> | Promise<boolean> | boolean
    {
        this.loginService.IsLoggedIn.subscribe(isLoggedIn=>{
            this.allowActivate = isLoggedIn;
        });
        if(this.allowActivate){

            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}