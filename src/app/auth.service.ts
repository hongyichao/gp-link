import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AuthResponseData} from './interfaces/authresponsedata';
import {environment} from '../environments/environment';
import {CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails, CognitoUserSession } from 'amazon-cognito-identity-js';
import { BehaviorSubject, Subject } from 'rxjs';
import { AppUser } from './shared-models/app.user';
import { AppDataService } from './app-data.service';
import { UserRegistration } from './shared-models/app.user-registration';
import { Doctor } from './shared-models/app.doctor';
import { Patient } from './shared-models/app.patient';
import { UserAuthSession } from './shared-models/user.auth-session';
import { Router } from '@angular/router';

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

  constructor(private httpclient: HttpClient, private dataService: AppDataService, private router: Router) {
    const storageAppUsers = sessionStorage.getItem('gpAppUsers');

    this.appUsers = storageAppUsers ? JSON.parse(storageAppUsers) : [];

    if (this.appUsers.length === 0) {
      this.appUsers = [
        {Id: 1, FirstName: 'Admin', LastName: 'Admin', Username: 'admin', Password: 'admin', Type: 'admin'},
        {Id: 2, FirstName: 'doctor', LastName: 'doctor', Username: 'doctor', Password: 'doctor', Type: 'doctor'},
        {Id: 3, FirstName: 'patient', LastName: 'patient', Username: 'patient', Password: 'patient', Type: 'patient'}
      ];
    }

    const activeUser = this.isAuthenticated();

    if (activeUser) {
      this.login(activeUser.Username, activeUser.Password);
    }
  }

  // signup(username: string, email: string, password: string): any {
  //   const attributeList = [];

  //   attributeList.push(new CognitoUserAttribute({Name: 'email', Value: email}));

  //   UserPool.signUp(username, password, attributeList, null, (err, result) => {
  //      if (err) {
  //        alert(err.message || JSON.stringify(err));
  //        return;
  //      }
  //      const cognitoUser = result.user;
  //      console.log('user name is ' + cognitoUser.getUsername());
  //      return cognitoUser.getUsername();
  //    });
  // }

  signup(newUser: UserRegistration): boolean {
    const existingUser = this.appUsers.find( u => u.Username === newUser.Username);
    if (existingUser) {
      return false;
    }

    const newAppUser: AppUser = {
      Id: this.appUsers.length === 0 ? 1 : this.appUsers[this.appUsers.length - 1].Id + 1,
      FirstName: newUser.FirstName,
      LastName: newUser.LastName,
      Username: newUser.Username,
      Password: newUser.Password,
      Type: newUser.Type
    };

    this.appUsers.push(newAppUser);

    sessionStorage.setItem('gpAppUsers', JSON.stringify(this.appUsers));

    if (newUser.Type === 'doctor') {
      const newDoctor: Doctor = {
        Id: 111,
        FirstName: newUser.FirstName,
        LastName: newUser.LastName,
        Email: newUser.Email,
        Phone: newUser.Phone
      };

      this.dataService.AddDoctor(newDoctor);
    } else {
      const newPatient: Patient = {
        Id: 111,
        FirstName: newUser.FirstName,
        LastName: newUser.LastName,
        Email: newUser.Email,
        Phone: newUser.Phone
      };

      this.dataService.AddPatient(newPatient);
    }



    console.log(this.appUsers);

    return true;
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

      const userAuthSession: UserAuthSession = {
        Token: 'isLoggedIn',
        ActiveUser: theUser
      };

      sessionStorage.setItem('userAuthSession', JSON.stringify(userAuthSession));

      if (theUser.Type === 'doctor' || theUser.Type === 'admin') {
        this.router.navigate(['/doctors']);
      }

      if (theUser.Type === 'patient') {
        this.router.navigate(['/patients']);
      }

      return theUser;
    } else {
      this.IsLoggedIn.next(false);

      sessionStorage.removeItem('userAuthSession');
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

  isAuthenticated(): AppUser {

    const storageUserSession = sessionStorage.getItem('userAuthSession');

    const userAuthSession: UserAuthSession = storageUserSession ? JSON.parse(storageUserSession) : null;

    if (userAuthSession) {
      return userAuthSession.ActiveUser;
    }

    // const user = this.getAuthenticatedUser();
    // if (!user) {
    //   this.IsLoggedIn.next(false);
    // } else {
    //   user.getSession((err, session) => {
    //     if ( err) {
    //       this.IsLoggedIn.next(false);
    //     } else {
    //       if (session.isValid()) {
    //         this.IsLoggedIn.next(true);
    //         this.IdToken = session.getIdToken().getJwtToken();
    //       } else {
    //         this.IsLoggedIn.next(false);
    //       }
    //     }
    //   });
    // }
  }

}
