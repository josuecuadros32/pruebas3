import { NgForm } from '@angular/forms';
import { AuthService } from './../model/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Registro } from './../model/registro';
import { Component, OnInit } from '@angular/core';
import { AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  registros: AngularFireObject<any>;
  registros2: Observable<any>;
  constructor(
    private authservice: AuthService,
    private storage: AngularFireStorage
  ) { }
  public email = '';

  public password = '';
  public imgae = '';

  registro: Registro = {
    id: null,
    nombre: '',
    apellido: '',
    edad: '',
    email: '',
    password: '',
    image: ''
  };

  public providerId: string = null;

  ngOnInit() {
    this.authservice.isUser().subscribe(user => {
      if (user) {
        this.registro.nombre = user.displayName;
        this.registro.email = user.email;
        this.registro.image = user.photoURL;
        this.providerId = user.providerData[0].providerId;
      }
    });
  }
  getUrl() {
    return 'url("../../assets/imagenes/fondo3.jpg")';
  }
  onUpload(e) {
    // console.log('subir', e.target.files[0]);
    const id = Math.random()
      .toString(36)
      .substring(2);
    const file = e.target.files[0];
    const filepath = `uploads/profile_${id}`;
    const ref = this.storage.ref(filepath);
    const task = this.storage.upload(filepath, file);
  }
}
