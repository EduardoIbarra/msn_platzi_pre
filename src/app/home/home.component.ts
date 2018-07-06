import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
  @ViewChild('friendRequest') friendRequestModalRef;
  shouldAdd: any;
  currentRequest: any;
  mailsShown: any = [];
  requests: any = [];
  requestModalRef: any;
  constructor(public userFirebaseService: UserFirebaseService, public authenticationService: AuthenticationService, public router: Router, private modalService: NgbModal, public requestService: RequestService) {
    this.userFirebaseService.getUsers().valueChanges().subscribe((result: User[]) => {
      this.users = result;
    });
    const stream = this.authenticationService.getStatus();
    stream.subscribe((result) => {
      this.userFirebaseService.getUserById(result.uid).valueChanges().subscribe((userResult) => {
        this.user = userResult;
        this.user.friends = Object.values(this.user.friends);
        console.log(this.user);
        this.getRequestsForEmail();
      });
    });
  }
  getRequestsForEmail() {
    this.requestService.getRequestsForEmail(this.user.email).valueChanges().subscribe( (requests: any) => {
      this.requests = requests;
      this.requests = this.requests.filter((r) => {
        return r.status !== 'accepted' && r.status !== 'rejected';
      });
      this.requests.forEach((r) => {
        if(this.mailsShown.indexOf(r.sender.email) === -1) {
          this.mailsShown.push(r.sender.email);
          this.currentRequest = r;
          this.open(this.friendRequestModalRef);
        }
      });
    });
  }
  sendRequest() {
    const request = {
      timestamp: Date.now(),
      receiver: this.requestEmail,
      status: 'pending',
      sender: this.user.user_id
    };
    this.requestService.createRequest(request, this.requestEmail).then(() => {
      alert('Solicitud Enviada');
    });
  }
  open(content) {
    this.requestModalRef = this.modalService.open(content).result.then((result) => {
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
  readRequest() {
    this.open(this.friendRequestModalRef);
  }
  accept() {
    if (this.shouldAdd === 'yes') {
      this.requestService.setRequestStatus(this.currentRequest, 'accepted').then(() => {
        console.log(this.currentRequest);
        this.userFirebaseService.addFriend(this.user.user_id, this.currentRequest.sender);
        alert('Gracias!');
      });
    } else {
      this.requestService.setRequestStatus(this.currentRequest, 'rejected').then(() => {
        alert('Gracias!');
      });
    }
  }
  decline() {
    this.requestService.setRequestStatus(this.currentRequest, 'decide_later');
  }
}
