import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../interfaces/user';
import { UserFirebaseService } from '../services/user-firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any = {};
  operation = 'login';
  constructor(public authenticationService: AuthenticationService, public userFirebaseService: UserFirebaseService, public router: Router) { }

  ngOnInit() {
  }
  login() {
    this.authenticationService.loginWithEmail(this.user.email, this.user.password).then((result) => {
      alert('Usuario loggeado con éxito');
      console.log(result);
      this.router.navigate(['home']);
    }).catch((error) => {
      alert('Ocurrió un error al intentar loggear el usuario');
      console.log(error);
    });
  }
  register() {
    this.authenticationService.registerWithEmail(this.user.email, this.user.password).then((result: any) => {
      console.log(result);
      const user: User = {
        nick: this.user.nick,
        subnick: '',
        status: 'online',
        email: this.user.email,
        user_id: result.user.uid
      };
      this.userFirebaseService.createUser(user).then((result2) => {
        alert('Usuario registrado con éxito');
        console.log(result2);
      });
    }).catch((error) => {
      alert('Ocurrió un error al intentar registrar el usuario');
      console.log(error);
    });
  }

}
