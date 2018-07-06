import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user';
import { UserFirebaseService } from '../services/user-firebase.service';
import {AuthenticationService} from '../services/authentication.service';
import {ConversationService} from '../conversation.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  id: any;
  user: User;
  friend: User;
  message: string;
  ids = [];
  conversation: any;
  doingZumbido: boolean = false;
  constructor(public activatedRoute: ActivatedRoute, public userFirebaseService: UserFirebaseService, public authenticationService: AuthenticationService, public conversationService: ConversationService) {
    this.id = activatedRoute.snapshot.params['user_id'];
    this.authenticationService.getStatus().subscribe((response) => {
      this.userFirebaseService.getUserById(response.uid).valueChanges().subscribe((user: User) => {
        this.user = user;
        console.log(this.user);
        this.userFirebaseService.getUserById(this.id).valueChanges().subscribe((result: User) => {
          this.friend = result;
          console.log(this.friend);
          this.getConversationMessages();
        });
      });
    });
  }
  getConversationMessages() {
    this.ids = [this.friend.user_id, this.user.user_id].sort();
    const stream = this.conversationService.getConversation(this.ids.join('||'));
    stream.valueChanges().subscribe( (resultConversation) => {
      this.conversation = resultConversation;
      console.log(this.conversation);
      this.conversation.forEach( (message) => {
        if (!message.seen && message.sender !== this.user.user_id) {
          const promise = this.conversationService.setConversationAttribute(message.uid, message.timestamp, 'seen', true);
          promise.then(() => {
            if (message.type === 'zumbido') {
              this.showZumbido();
            }
            if (message.type === 'text') {
              const audio = new Audio('assets/sound/new_message.m4a');
              audio.play();
            }
          });
        }
      });
    });
  }
  sendZumbido() {
    this.ids = [this.friend.user_id, this.user.user_id].sort();
    const messageObject = {
      uid: this.ids.join('||'),
      timestamp: Date.now(),
      sender: this.user.user_id,
      receiver: this.friend.user_id,
      type: 'zumbido'
    };
    console.log(messageObject);
    this.conversationService.createConversation(messageObject).then(() => {
      this.showZumbido();
    });
    this.message = '';
  }
  showZumbido() {
    this.doingZumbido = true;
    window.setTimeout(() => {
      this.doingZumbido = false;
    }, 1000);
    const audio = new Audio('assets/sound/zumbido.m4a');
    audio.play();
  }
  sendMessage() {
    this.ids = [this.friend.user_id, this.user.user_id].sort();
    const messageObject = {
      uid: this.ids.join('||'),
      timestamp: Date.now(),
      sender: this.user.user_id,
      receiver: this.friend.user_id,
      content: this.message.replace(/\n$/, ''),
      type: 'text'
    };
    console.log(messageObject);
    this.conversationService.createConversation(messageObject).then(() => {
      // mensaje enviado
      const audio = new Audio('assets/sound/new_message.m4a');
      audio.play();
    });
    this.message = '';
  }
  ngOnInit() {
  }
  getNickById(id) {
    if (id === this.user.user_id) {
      return this.user.nick;
    } else {
      return this.friend.nick;
    }
  }

}
