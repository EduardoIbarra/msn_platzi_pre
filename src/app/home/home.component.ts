import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserFirebaseService } from '../services/user-firebase.service';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RequestService} from '../request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: User[];
  query: string;
  requestEmail: string;
  user: any;
  constructor(public userFirebaseService: UserFirebaseService, public authenticationService: AuthenticationService, public router: Router, private modalService: NgbModal, public requestService: RequestService) {
    this.userFirebaseService.getUsers().valueChanges().subscribe((result: User[]) => {
      this.users = result;
    });
    const stream = this.authenticationService.getStatus();
    stream.subscribe((result) => {
      this.user = result;
    });
  }
  sendRequest() {
    const request = {
      timestamp: Date.now(),
      receiver: this.requestEmail,
      status: 'pending',
      sender: this.user.uid
    };
    this.requestService.createRequest(request, this.requestEmail).then(() => {
      alert('Solicitud Enviada');
    });
  }
  open(content) {
    this.modalService.open(content).result.then((result) => {
      console.log(result);
    });
  }
  ngOnInit() {
  }
  logOut() {
    this.authenticationService.logOut().then(() => {
      this.router.navigate(['login']);
    });
  }
}
