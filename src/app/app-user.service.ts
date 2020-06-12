import { Injectable } from '@angular/core';
import { AppUser } from './shared-models/app.user';
import { UserRegistration } from './shared-models/app.user-registration';

@Injectable({
  providedIn: 'root'
})
export class AppUserService {
  appUsers: AppUser[];
  constructor() {
    const storageAppUsers = sessionStorage.getItem('gpAppUsers');

    this.appUsers = storageAppUsers ? JSON.parse(storageAppUsers) : [];

    if (this.appUsers.length === 0) {
      this.appUsers = [
        {Id: 1, FirstName: 'Admin', LastName: 'Admin', Username: 'admin', Password: 'admin', Type: 'admin'},
        {Id: 2, FirstName: 'doctor', LastName: 'doctor', Username: 'doctor', Password: 'doctor', Type: 'doctor'},
        {Id: 3, FirstName: 'patient', LastName: 'patient', Username: 'patient', Password: 'patient', Type: 'patient'},

        {Id: 4, FirstName: 'Lucas', LastName: 'Chao', Username: 'lchao', Password: '123', Type: 'doctor'},
        {Id: 5, FirstName: 'Terry', LastName: 'Farrell', Username: 'tfarrell', Password: '123', Type: 'doctor'},
        {Id: 6, FirstName: 'Jane', LastName: 'Fonda', Username: 'jfonda', Password: '123', Type: 'doctor'},
        {Id: 7, FirstName: 'Helen', LastName: 'Keller', Username: 'hhelenk', Password: '123', Type: 'doctor'},
        {Id: 8, FirstName: 'Johnny', LastName: 'Depp', Username: 'jdepp', Password: '123', Type: 'doctor'},
        {Id: 9, FirstName: 'Mark', LastName: 'Zuck', Username: 'markz', Password: '123', Type: 'doctor'},
        {Id: 10, FirstName: 'Andrew', LastName: 'Jackson', Username: 'ajackson', Password: '123', Type: 'doctor'},
        {Id: 11, FirstName: 'Alexandra', LastName: 'Daddario', Username: 'alexandrad', Password: '123', Type: 'doctor'},
        {Id: 12, FirstName: 'Jemma', LastName: 'Murphy', Username: 'jmurphy', Password: '123', Type: 'doctor'},
        {Id: 13, FirstName: 'Jemma', LastName: 'Bridge', Username: 'jbridge', Password: '123', Type: 'doctor'},
        {Id: 14, FirstName: 'Vicent', LastName: 'Stanley', Username: 'vstanley', Password: '123', Type: 'doctor'},

        {Id: 15, FirstName: 'John', LastName: 'Xu', Username: 'johnx', Password: '123', Type: 'patient'},
        {Id: 16, FirstName: 'Michael', LastName: 'Graves', Username: 'michaelg', Password: '123', Type: 'patient'},
        {Id: 17, FirstName: 'Taylor', LastName: 'Swift', Username: 'taylors', Password: '123', Type: 'patient'}
      ];
    }
  }

  getAllAppUsers() {
    return this.appUsers;
  }

  getUserById(id: number): AppUser {
    const theUser = this.appUsers.find(u => u.Id === id);
    return theUser;
  }

  getUserByUsername(username: string): AppUser {
    const theUser = this.appUsers.find( u => u.Username === username);
    return theUser;
  }

  addUser(newUser: UserRegistration): AppUser {
    const existingUser = this.appUsers.find( u => u.Username === newUser.Username);
    if (existingUser) {
      return;
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

    console.log(this.appUsers);
    return newAppUser;
  }

  updateUser(updatedUser: AppUser) {
    const index = this.appUsers.findIndex(d => d.Id === +updatedUser.Id);
    this.appUsers[index] = updatedUser;

    sessionStorage.setItem('gpAppUsers', JSON.stringify(this.appUsers));
  }
}
