import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AuthResponseData} from './interfaces/authresponsedata';

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private httpclient: HttpClient) {

  }

  signup(email: string, password: string) {
    return this.httpclient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB6LEv6kEmXTYTLS1Ph9zBrHCPwiZFveAc',
      {
        email: email,
        password: password,
        returnSecureToken: true
      },
      {
        headers: new HttpHeaders({'Access-Control-Allow-Origin': '*'}),
      }
    )


  }

}
