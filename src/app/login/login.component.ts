import { AuthService } from './../model/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private authservice: AuthService,
    public afAuth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService
  ) {}

  public email = '';
  public password = '';

  ngOnInit() {}

  // login con Google

  onLoginGoogle(): void {
    this.authservice
      .loginGoogle()
      .then(res => {
        this.Redirect();
      })
      .catch(err => console.log('err', err.message));
  }

  // login con Facebook
  onLoginFacebook(): void {
    this.authservice
      .loginFacebook()
      .then(res => {
        this.Redirect();
      })
      .catch(err => console.log('err', err.message));
  }

  // login de email y contraseña

  onLogin(): void {
    this.authservice
      .loginEmail(this.email, this.password)
      .then(res => {
        this.toastr.success('', 'Su Sesion inicio con exito');
        this.Redirect();
      })
      .catch(err =>
        console.log(
          'err',
          err.message,
          this.toastr.error('', 'Esta cuenta no existe o el correo o contraseña son incorrectos')));
        }

  Redirect(): void {
    this.router.navigate(['profile']);
  }

  getUrl() {
    return 'url("../../assets/imagenes/fondo3.jpg")';
  }
}
