import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user';
import { UserFirebaseService } from '../services/user-firebase.service';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  id: any;
  user: User;
  friend: User;
  form: any = {message: ''};
  constructor(public activatedRoute: ActivatedRoute, public userFirebaseService: UserFirebaseService, public authenticationService: AuthenticationService) {
    this.id = activatedRoute.snapshot.params['user_id'];
    this.userFirebaseService.getUserById(this.id).valueChanges().subscribe((result: User) => {
      this.friend = result;
    });
    this.authenticationService.getStatus().subscribe((response) => {
      this.userFirebaseService.getUserById(response.uid).valueChanges().subscribe((user) => {
        this.user = user;
      });
    });
  }

  ngOnInit() {
  }

}
