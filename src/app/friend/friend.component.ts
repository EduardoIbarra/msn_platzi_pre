import {Component, Input, OnInit} from '@angular/core';
import {UserFirebaseService} from '../services/user-firebase.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {
  @Input() user_id: string;
  friend = null;
  constructor(public userFirebaseService: UserFirebaseService) { }

  ngOnInit() {
    const stream = this.userFirebaseService.getUserById(this.user_id);
    stream.valueChanges().subscribe((result) => {
      this.friend = result;
    });
  }

}
