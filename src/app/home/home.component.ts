import {Component, OnInit, ViewChild} from '@angular/core';
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
  shouldAdd: string = 'yes';
  @ViewChild('friendRequest') friendRequestModal;
  requests = [];
  currentRequest: any;
  userObject: any;
  constructor(public userFirebaseService: UserFirebaseService, public authenticationService: AuthenticationService, public router: Router, private modalService: NgbModal, public requestService: RequestService) {
    this.userFirebaseService.getUsers().valueChanges().subscribe((result: User[]) => {
      this.users = result;
    });
    const stream = this.authenticationService.getStatus();
    stream.subscribe((result) => {
      this.user = result;
      this.userFirebaseService.getUserById(this.user.uid).valueChanges().subscribe((result2) => {
        this.userObject = result2;
        this.userObject.friends = Object.values(this.userObject.friends);
        console.log(this.userObject);
      });
      this.getRequestsForEmail();
    });
  }
  getRequestsForEmail() {
    const stream = this.requestService.getRequestsForEmail(this.user.email);
    stream.valueChanges().subscribe((requests) => {
      this.requests = requests;
      this.requests = this.requests.filter((r) => {
        return r.status !== 'accepted' && r.status !== 'rejected';
      });
      this.requests.forEach((r) => {
        this.currentRequest = r;
        this.openModal();
      });
      console.log(this.requests);
    });
  }
  openModal() {
    this.modalService.open(this.friendRequestModal);
  }
  accept() {
    if (this.shouldAdd === 'yes') {
      this.requestService.setRequestStatus(this.currentRequest, 'accepted').then(() => {
        this.userFirebaseService.addFriend(this.user.uid, this.currentRequest.sender);
        alert('Sí aceptó');
      });
    } else {
      this.requestService.setRequestStatus(this.currentRequest, 'rejected');
      alert('No aceptó');
    }
  }
  decideLater() {
    this.requestService.setRequestStatus(this.currentRequest, 'decide_later');
    alert('Decidiremos luego');
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
