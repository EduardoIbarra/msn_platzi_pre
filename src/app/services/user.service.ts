import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = [
    {user_id: 1, nick: 'Eduardo', subnick: 'Mi mensaje personal', status: 'online', email: 'eduardo@platzi.com', avatar_url: '', downloaded_picture: false},
    {user_id: 2, nick: 'Yuliana', subnick: 'Mi mensaje personal', status: 'busy', email: 'yuliana@platzi.com', avatar_url: '', downloaded_picture: false},
    {user_id: 3, nick: 'Nicole', subnick: 'Mi mensaje personal', status: 'away', email: 'freddy@platzi.com', avatar_url: '', downloaded_picture: false},
    {user_id: 4, nick: 'Freddy', subnick: 'Mi mensaje personal', status: 'away', email: 'freddy@platzi.com', avatar_url: '', downloaded_picture: false}
  ];
  constructor() { }
  getUsers() {
    return this.users;
  }
  getUserById(id) {
    const foundUser = this.users.find( (u: User) => {
      return u.user_id == id;
    });
    return foundUser;
  }
}
