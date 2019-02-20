import { AuthService } from './../model/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  constructor(
    private afAuth: AngularFireAuth,
    private authservice: AuthService ) { }

  public isLogged = false;
  public login = true;
  ngOnInit() {
    this.getUser();
    this.getDeUser();
  }
  getUser() {
    this.authservice.isUser().subscribe(auth => {
      if (auth) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    });
  }

  logout() {
    return this.afAuth.auth.signOut();
  }
  getDeUser() {
    this.authservice.isUser().subscribe(auth => {
      if (auth) {
        this.login = false;
      } else {
        this.login = true;
      }
    });
  }

}
