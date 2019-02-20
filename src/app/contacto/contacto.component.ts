import { ComentariosService } from './../model/comentarios.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {Comentario} from '../model/comentario';
@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  comentarios: Comentario[];
  constructor(
    private cometario: ComentariosService,
    private firestore: AngularFirestore,
    private toastr: ToastrService,
    private router: Router
  ) {}
  public email = '';
  public comentario = '';

  ngOnInit() {
    this.cometario.getCometarios().subscribe(data => {
      this.comentarios = data.map(e => {
        return {
          ...e.payload.doc.data()
        } as Comentario;
      });
    });
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.cometario.cometarioForm = {
      email: '',
      comentario: ''
    };
  }
  onSubmit(form: NgForm) {
    const data = form.value;
    this.firestore.collection('comentarios').add(data);
    this.toastr.success('', 'Comentario enviado con exito');
    this.resetForm(form);
  }

  Redirect(): void {
    this.router.navigate(['profile']);
  }
  getUrl() {
    return 'url("../../assets/imagenes/fondo3.jpg")';
  }
}
