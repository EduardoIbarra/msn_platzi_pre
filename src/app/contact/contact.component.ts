import { Component, OnInit, Input } from '@angular/core';
import {User} from '../interfaces/user';
import {UserFirebaseService} from '../services/user-firebase.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @Input() user_id: string;
  contact: User;
  constructor(public userFirebaseService: UserFirebaseService) {
  }

  ngOnInit() {
    console.log(this.user_id);
    this.userFirebaseService.getUserById(this.user_id).valueChanges().subscribe((response: User) => {
      this.contact = response;
    });
  }

}
