import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class UserFirebaseService {

  constructor(public angularFireDatabase: AngularFireDatabase) { }
  getUsers() {
    return this.angularFireDatabase.list('/users');
  };
  getUserById(userId) {
    return this.angularFireDatabase.object('/users/' + userId);
  }
  createUser(user) {
    return this.angularFireDatabase.object('/users/' + user.user_id).set(user);
  }
}
