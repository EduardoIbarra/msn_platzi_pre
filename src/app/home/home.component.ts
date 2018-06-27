import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: User[] = [
    {nick: 'Eduardo', subnick: 'Mi mensaje personal', status: 'online', age: 28, email: 'eduardo@platzi.com', friend: true},
    {nick: 'Yuliana', subnick: 'Mi mensaje personal', status: 'busy', age: 25, email: 'yuliana@platzi.com', friend: true},
    {nick: 'Freddy', subnick: 'Mi mensaje personal', status: 'away', age: 28, email: 'freddy@platzi.com', friend: false},
    {nick: 'Freddy', subnick: 'Mi mensaje personal', status: 'away', age: 28, email: 'freddy@platzi.com', friend: true}
  ];
  constructor() { }

  ngOnInit() {
  }

}
