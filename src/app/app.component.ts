import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from './services/authentication.service';
import {User} from './interfaces/user';
import {RequestService} from './services/request.service';
import {FriendRequestModalComponent} from './modals/friend-request/friend-request.modal';
import {DialogService} from 'ng2-bootstrap-modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  user;
  requests: any = [];
  shouldAdd: boolean;
  mailsShown: any = [];
  constructor(public router: Router, public authenticationService: AuthenticationService, public requestService: RequestService, private dialogService: DialogService) {
    this.authenticationService.getStatus().subscribe((result) => {
      this.user = result;
      this.requestService.getRequestsForEmail(this.user.email).valueChanges().subscribe( (requests: any) => {
        this.requests = requests;
        this.requests = this.requests.filter((r) => {
          return r.status !== 'accepted' && r.status !== 'rejected';
        });
        this.requests.forEach((r) => {
          if(this.mailsShown.indexOf(r.sender.email) === -1) {
            this.mailsShown.push(r.sender.email);
            this.dialogService.addDialog(FriendRequestModalComponent, {scope: this, currentRequest: r});
          }
        });
      });
    });
  }
}
