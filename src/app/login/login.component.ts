import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any = {};
  operation = 'login';
  constructor(public authenticationService: AuthenticationService) { }

  ngOnInit() {
  }
  login() {
    this.authenticationService.loginWithEmail(this.user.email, this.user.password).then((result) => {
      alert('Usuario loggeado con éxito');
      console.log(result);
    }).catch((error) => {
      alert('Ocurrió un error al intentar loggear el usuario');
      console.log(error);
    });
  }
  register() {
    this.authenticationService.registerWithEmail(this.user.email, this.user.password).then((result) => {
      alert('Usuario registrado con éxito');
      console.log(result);
    }).catch((error) => {
      alert('Ocurrió un error al intentar registrar el usuario');
      console.log(error);
    });
  }

}
