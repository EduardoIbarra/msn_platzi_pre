import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[];
  constructor() { }
  getUsers() {
    return this.users;
  }
  getUserById(id) {
    const foundUser = this.users.find( (u: User) => {
      return u.user_id === id;
    });
    return foundUser;
  }
}
