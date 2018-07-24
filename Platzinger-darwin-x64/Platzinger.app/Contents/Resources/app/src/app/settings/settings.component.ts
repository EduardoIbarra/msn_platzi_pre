import { Component, OnInit } from '@angular/core';
import {UserFirebaseService} from '../services/user-firebase.service';
import {User} from '../interfaces/user';
import {AuthenticationService} from '../services/authentication.service';
import {AngularFireStorage} from 'angularfire2/storage';
import {Router} from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  user: User;
  picture: any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  constructor(public userFirebaseService: UserFirebaseService, public authenticationService: AuthenticationService, public fbStorage: AngularFireStorage, public router: Router) {
    this.authenticationService.getStatus().subscribe((status) => {
      this.userFirebaseService.getUserById(status.uid).valueChanges().subscribe((result: User) => {
        this.user = result;
        this.picture = (this.user.downloaded_picture) ? this.user.avatar_url :
          'https://wir.skyrock.net/wir/v1/profilcrop/?c=mog&w=301&h=301&im=%2Fart%2FPRIP.85914100.3.0.png';
      });
    });
  }

  ngOnInit() {
  }

  saveSettings() {
    if(this.croppedImage) {
      const currentPictureId = Date.now();
      const pictures = this.fbStorage.ref('pictures/' + currentPictureId + '.jpg').putString(this.croppedImage, 'data_url');
      pictures.then((result) => {
        this.picture = this.fbStorage.ref('pictures/' + currentPictureId + '.jpg').getDownloadURL();
        this.picture.subscribe((p) => {
          this.userFirebaseService.setProfilePicture(p, this.user.user_id).then( () => {
            this.userFirebaseService.editUser(this.user).then( () => {
              alert('Configuración Guardada!');
              this.router.navigateByUrl('/home');
            });
          });
        });
      });
    } else {
    this.userFirebaseService.editUser(this.user).then( () => {
      alert('Configuración Guardada!');
    });
    }
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(image: string) {
    this.croppedImage = image;
    console.log(this.croppedImage);
  }
  imageLoaded() {
    // show cropper
  }
  loadImageFailed() {
    // show message
  }
}
