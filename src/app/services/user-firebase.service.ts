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
  editUser(user) {
    return this.angularFireDatabase.object('/users/' + user.user_id).set(user);
  }
  setProfilePicture(picture_url, user_id) {
    this.angularFireDatabase.object('users/' + user_id + '/downloaded_picture').set(true);
    return this.angularFireDatabase.object('users/' + user_id + '/avatar_url').set(picture_url);
  }
  addFriend(user_id, friend_id) {
    this.angularFireDatabase.object('users/' + user_id + '/friends/' + friend_id).set(friend_id);
    return this.angularFireDatabase.object('users/' + friend_id + '/friends/' + user_id).set(user_id);
  }
}
