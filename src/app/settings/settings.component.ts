import { Component, OnInit } from '@angular/core';
import {UserFirebaseService} from '../services/user-firebase.service';
import {User} from '../interfaces/user';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  user: User;
  constructor(public userFirebaseService: UserFirebaseService, public authenticationService: AuthenticationService) {
    this.authenticationService.getStatus().subscribe((status) => {
      this.userFirebaseService.getUserById(status.uid).valueChanges().subscribe((result) => {
        console.log(result);
        this.user = result;
      });
    });
  }

  ngOnInit() {
  }

  saveSettings() {
    this.userFirebaseService.createUser(this.user).then( () => {
      alert('Configuración Guardada!');
    });
  }
}
