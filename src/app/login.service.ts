import { Injectable } from '@angular/core';

@Injectable({
    providedIn:'root'    
})
export class LoginService
{
    IsLoggedIn: boolean;

    ToLogin(): void
    {
        this.IsLoggedIn = true;
    }

    ToLogOut(): void
    {
        this.IsLoggedIn = false;
    }
}