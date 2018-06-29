import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserFirebaseService } from '../services/user-firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: User[];
  constructor(public userFirebaseService: UserFirebaseService) {
    this.userFirebaseService.getUsers().valueChanges().subscribe((result: User[]) => {
      this.users = result;
    });
  }

  ngOnInit() {
  }

}
