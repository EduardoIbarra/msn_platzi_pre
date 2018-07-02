import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private angularFireDatabase: AngularFireDatabase) { }
  createConversation(conversation) {
    return this.angularFireDatabase.object('conversations/' + conversation.uid + '/' + conversation.timestamp).set(conversation);
  }
  getConversations() {
    return this.angularFireDatabase.list('conversations/');
  }
  getConversation(uid) {
    return this.angularFireDatabase.object('conversations/' + uid);
  }
  updateMessage(conversation, message) {
    return this.angularFireDatabase.object('conversations/' + conversation + '/' + message.timestamp).set(message);
  }
}
