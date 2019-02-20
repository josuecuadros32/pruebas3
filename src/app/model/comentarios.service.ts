import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import {Comentario} from './comentario';
@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  cometarioForm: Comentario;
  constructor(private firestore: AngularFirestore) { }


  getCometarios() {
    return this.firestore.collection('comentarios').snapshotChanges();
  }

}
