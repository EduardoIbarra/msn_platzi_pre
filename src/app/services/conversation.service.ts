import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private angularFireDatabase: AngularFireDatabase) { }
  createConversation(conversation) {
    return this.angularFireDatabase.object('conversations/' + conversation.user_id + '/' + conversation.timestamp).set(conversation);
  }
  getConversations() {
    return this.angularFireDatabase.list('conversations/');
  }
  getConversation(user_id) {
    return this.angularFireDatabase.object('conversations/' + user_id);
  }
  updateMessage(conversation, message) {
    return this.angularFireDatabase.object('conversations/' + conversation + '/' + message.timestamp).set(message);
  }
}
