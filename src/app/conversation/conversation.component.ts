import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';
import { UserFirebaseService } from '../services/user-firebase.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  id: any;
  user: User;
  constructor(public activatedRoute: ActivatedRoute, public userFirebaseService: UserFirebaseService) {
    this.id = activatedRoute.snapshot.params['user_id'];
    this.userFirebaseService.getUserById(this.id).valueChanges().subscribe((result: User) => {
      this.user = result;
    });
  }

  ngOnInit() {
  }

}
