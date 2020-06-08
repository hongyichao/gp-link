import { Component, OnInit } from '@angular/core';
import { AppDataService } from '../app-data.service';
import { AppUser } from '../shared-models/app.user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  appUsers: AppUser[];
  constructor(private dataService: AppDataService, private authService: AuthService) { }

  ngOnInit(): void {
    this.appUsers = this.authService.appUsers;
  }
}
