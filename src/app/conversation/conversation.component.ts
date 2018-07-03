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
  conversation: any = [];
  shake = false;
  constructor(public activatedRoute: ActivatedRoute, public userFirebaseService: UserFirebaseService, public authenticationService: AuthenticationService, public conversationService: ConversationService) {
    this.id = activatedRoute.snapshot.params['user_id'];
    this.authenticationService.getStatus().subscribe((response) => {
      this.userFirebaseService.getUserById(response.uid).valueChanges().subscribe((user: User) => {
        this.user = user;
        this.userFirebaseService.getUserById(this.id).valueChanges().subscribe((result: User) => {
          this.friend = result;
          this.ids = [this.user.user_id, this.friend.user_id].sort();
          this.getConversation();
        });
      });
    });
  }

  ngOnInit() {
  }
  sendMessage() {
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
  sendZumbido() {
    this.doZumbido();
    const messageObject: any = {
      uid: this.ids.join('||'),
      timestamp: Date.now(),
      sender: this.user.user_id,
      receiver: this.friend.user_id,
      type: 'zumbido',
    };
    this.conversationService.createConversation(messageObject);
  }
  getConversation() {
    this.conversationService.getConversation(this.ids.join('||')).valueChanges()
      .subscribe((result) => {
        if (!result) {
          return;
        }
        this.conversation = Object.keys(result).map(function (key) { return result[key]; });
        this.conversation.forEach((m: any) => {
          if (!m.seen && m.sender !== this.user.user_id) {
            m.seen = true;
            this.conversationService.updateMessage(this.ids.join('||'), m);
          }
        });
        this.scrollToBottom();
      });
  }
  getUserNickById(id) {
    if (id === this.friend.user_id) {
      return this.friend.nick;
    } else if (id === this.user.user_id) {
      return this.user.nick;
    }
  }
  scrollToBottom() {
    window.setTimeout(() => {
      const objDiv = document.getElementById('messageArea');
      if (objDiv) {
        objDiv.scrollTop = objDiv.scrollHeight;
      }
    }, 1);
  }
  doZumbido() {
    const audio = new Audio('assets/sound/zumbido.m4a');
    audio.play();
    this.shake = true;
    window.setTimeout(() => {
      this.shake = false;
    }, 800);
  }

}
