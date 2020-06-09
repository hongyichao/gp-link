import { Component, OnInit } from '@angular/core';
import { AppDataService } from '../app-data.service';
import { AppUser } from '../shared-models/app.user';
import { AuthService } from '../auth.service';
import { UserFilterParams } from '../shared-models/user-filter.params';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userFilterParams: UserFilterParams;
  appUsers: AppUser[];
  constructor(private dataService: AppDataService, private authService: AuthService) { }

  ngOnInit(): void {
    this.appUsers = this.authService.appUsers;
    this.userFilterParams = { UserType: 'doctor'};
  }
}
