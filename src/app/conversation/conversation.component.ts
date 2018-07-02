import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user';
import { UserFirebaseService } from '../services/user-firebase.service';
import {AuthenticationService} from '../services/authentication.service';
import {ConversationService} from '../services/conversation.service';

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
  ids = [];
  constructor(public activatedRoute: ActivatedRoute, public userFirebaseService: UserFirebaseService, public authenticationService: AuthenticationService, public conversationService: ConversationService) {
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
  sendMessage() {
    this.ids = [this.user.user_id, this.friend.user_id].sort();
    const messageObject: any = {
      uid: this.ids.join('||'),
      timestamp: Date.now(),
      sender: this.user.user_id,
      receiver: this.friend.user_id,
      type: 'text',
      content: this.form.message.replace(/\n$/, '')
    };
    this.conversationService.createConversation(messageObject).then(() => {
      // Mensaje enviado
    });
    this.form.message = '';
  }

}
