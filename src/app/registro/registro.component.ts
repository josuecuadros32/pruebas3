import { AuthService } from './../model/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit, ElementRef, ViewChild, NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  constructor(
    public authservice: AuthService,
    private firestore: AngularFirestore,
    private toastr: ToastrService,
    private router: Router,
    private storage: AngularFireStorage
  ) { }
  @ViewChild('imageUser') InputImageUser: ElementRef;
  public isLogged = false;
  public email = '';
  public password = '';
  public image = '';

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  ngOnInit() {
    this.resetForm();
  }

  // registro con google

  onLoginGoogle(): void {
    this.authservice
      .loginGoogle()
      .then(res => {
        this.Redirect();
      })
      .catch(err => console.log('err', err.message));
  }

  // registro con facebook

  onLoginFacebook(): void {
    this.authservice
      .loginFacebook()
      .then(res => {
        this.Redirect();
      })
      .catch(err => console.log('err', err.message));
  }

  // reset formulario despues de enviar el formulario
  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.authservice.registroForm = {
      id: null,
      nombre: '',
      apellido: '',
      edad: '',
      email: '',
      password: '',
      image: ''
    };
  }



  // enviar datos ala base de datos
  onSubmit(form: NgForm) {
    const data = form.value;
    this.firestore.collection('registro').add(data);
    this.toastr.success('', 'Registrado con exito');
    this.resetForm(form);
    this.Redirect();
  }

  // mandar el provedor que registra al usuario
  onUser() {
    this.authservice
      .registerUser(this.email, this.password)
      .then(() => {
        this.authservice.isUser().subscribe(user => {
          if (user) {
            user
              .updateProfile({
                displayName: '',
                photoURL: this.InputImageUser.nativeElement.value
              })
              .then(function () {
              })
              .catch(function (error) {
                console.log('error', error);
              });
          }
        });
      })
      .catch(err => console.log('err', err.message));
  }


  // metodo de imagenes de fondo
  getUrl() {
    return 'url("../../assets/imagenes/fondo3.jpg")';
  }


  // enviar la imagen en el formulario y generar un id para que se puedan cargar varias imagenes en el storage
  onUpload(e) {
    const id = Math.random()
      .toString(36)
      .substring(2);
    const file = e.target.files[0];
    const filepath = `uploads/profile_${id}`;
    const ref = this.storage.ref(filepath);
    const task = this.storage.upload(filepath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges()
      .pipe(finalize(() => (this.urlImage = ref.getDownloadURL())))
      .subscribe();
  }


  // funcion de redirecion
  Redirect(): void {
    this.router.navigate(['profile']);
  }
}
