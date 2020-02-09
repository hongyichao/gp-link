import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AuthResponseData} from './interfaces/authresponsedata';
import {environment} from '../environments/environment';

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private httpclient: HttpClient) {

  }

  signup(email: string, password: string) {
    return this.httpclient.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseApiKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      },
      {
        headers: {'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST'}
      }
    );


  }

}
