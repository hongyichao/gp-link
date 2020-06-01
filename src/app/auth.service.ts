import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AuthResponseData} from './interfaces/authresponsedata';
import {environment} from '../environments/environment';
import {CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails, CognitoUserSession } from 'amazon-cognito-identity-js';
import { BehaviorSubject, Subject } from 'rxjs';
import { AppUser } from './shared-models/app.user';

const PoolData = {
  UserPoolId: 'us-east-1_etXj9FOMw',
  ClientId: '377bm6ed0u7qh0ob8882iuqs25'
};
const UserPool = new CognitoUserPool(PoolData);

@Injectable({providedIn: 'root'})
export class AuthService {
  appUsers: AppUser[];
  loggedInUser: AppUser;

  IsLoggedIn = new  BehaviorSubject<boolean>(false);
  IdToken;

  constructor(private httpclient: HttpClient) {
    this.isAuthenticated();

    this.appUsers = [
      {Id: 1, FirstName: 'Admin', LastName: 'Admin', Username: 'admin', Password: 'admin', Type: 'admin'},
      {Id: 2, FirstName: 'doctor', LastName: 'doctor', Username: 'doctor', Password: 'doctor', Type: 'doctor'},
      {Id: 3, FirstName: 'patient', LastName: 'patient', Username: 'patient', Password: 'patient', Type: 'patient'}
    ];
  }

  signup(username: string, email: string, password: string): any {
    const attributeList = [];

    attributeList.push(new CognitoUserAttribute({Name: 'email', Value: email}));

    UserPool.signUp(username, password, attributeList, null, (err, result) => {
       if (err) {
         alert(err.message || JSON.stringify(err));
         return;
       }
       const cognitoUser = result.user;
       console.log('user name is ' + cognitoUser.getUsername());
       return cognitoUser.getUsername();
     });
  }

  confirmUser(username: string, verificationCode: string) {
    const userData = {
      Username: username,
      Pool: UserPool,
    };

    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(verificationCode, true, (err, result) => {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      console.log('call result: ' + result);
    });

  }

  login(username: string, password: string): AppUser {
    const theUser = this.appUsers.find( u => u.Username === username && u.Password === password);

    if (theUser) {
      this.loggedInUser = theUser;
      this.IsLoggedIn.next(true);
      return theUser;
    } else {
      this.IsLoggedIn.next(false);
      return null;
    }
  }

  logout() {
    this.IsLoggedIn.next(false);
  }

  signin(username: string, password: string) {
    const authenticationData = {
      Username: username,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(
      authenticationData
    );

    const userData = {
      Username: username,
      Pool: UserPool,
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (userSession: CognitoUserSession): any => {
        console.log(userSession);
        this.IdToken = userSession.getAccessToken().getJwtToken();

        this.IsLoggedIn.next(true);
      },

      onFailure: (err): any => {
        alert(err.message || JSON.stringify(err));
        this.IsLoggedIn.next(false);
      },
    });
  }

  getAuthenticatedUser() {
    return UserPool.getCurrentUser();
  }

  isAuthenticated() {
    const user = this.getAuthenticatedUser();
    if (!user) {
      this.IsLoggedIn.next(false);
    } else {
      user.getSession((err, session) => {
        if ( err) {
          this.IsLoggedIn.next(false);
        } else {
          if (session.isValid()) {
            this.IsLoggedIn.next(true);
            this.IdToken = session.getIdToken().getJwtToken();
          } else {
            this.IsLoggedIn.next(false);
          }
        }
      });
    }
  }

}
