import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoginService
{
    IsLoggedIn = new  BehaviorSubject<boolean>(false);
    LogdedInRedirectPage = '';

    ToLogin(): void {
        this.IsLoggedIn.next(true);
    }

    ToLogOut(): void {
        this.IsLoggedIn.next(false);
    }
}
