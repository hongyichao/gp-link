import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AuthResponseData} from './interfaces/authresponsedata';
import {environment} from '../environments/environment';
import {CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails, CognitoUserSession } from 'amazon-cognito-identity-js';

const PoolData = {
  UserPoolId: 'us-east-1_etXj9FOMw',
  ClientId: '377bm6ed0u7qh0ob8882iuqs25'
};
const UserPool = new CognitoUserPool(PoolData);

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private httpclient: HttpClient) {

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

  signin(username: string, password: string): any {
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
    var result = cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function(result: CognitoUserSession) {
        console.log(result);
        const accessToken = result.getAccessToken().getJwtToken();

        return true;
      },

      onFailure: function(err) {
        alert(err.message || JSON.stringify(err));
        return false;
      },
    });

    return result;
  }

}
