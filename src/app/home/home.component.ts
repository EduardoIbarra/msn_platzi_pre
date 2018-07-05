import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserFirebaseService } from '../services/user-firebase.service';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RequestService} from '../services/request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: User[];
  user: any;
  query: string;
  requestEmail: string;
  constructor(public userFirebaseService: UserFirebaseService, public authenticationService: AuthenticationService, public router: Router, private modalService: NgbModal, public requestService: RequestService) {
    this.userFirebaseService.getUsers().valueChanges().subscribe((result: User[]) => {
      this.users = result;
    });
    this.authenticationService.getStatus().subscribe((status: any) => {
      this.user = status;
    });
  }

  ngOnInit() {
  }
  logOut() {
    this.authenticationService.logOut().then(() => {
      this.router.navigate(['login']);
    });
  }
  open(content) {
    this.modalService.open(content).result.then((result) => {
      console.log(result);
    }, (reason) => {
      console.log(reason);
    });
  }
  sendRequest() {
    const request = {
      timestamp: Date.now(),
      receiver_email: this.requestEmail,
      sender: this.user.uid,
      status: 'pending'
    };
    this.requestService.createRequest(request).then(() => {
      alert('Solicitud Enviada!');
    });
  }
}
