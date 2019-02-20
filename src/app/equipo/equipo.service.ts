import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Empleado } from './empleado';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  constructor(private firestore: AngularFirestore) {
    this.empleadosCollection = firestore.collection<Empleado>('empleados');
    this.empleados = this.empleadosCollection.valueChanges();
  }
  private empleadosCollection: AngularFirestoreCollection<Empleado>;
  private empleados: Observable<Empleado[]>;
  private empleadodoc: AngularFirestoreDocument<Empleado>;
  private empleado: Observable<Empleado>;
  public selectedEmpleado: Empleado = {
    id: null
  };

  getEmpleados() {
    return this.empleados = this.empleadosCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Empleado;
          data.id = action.payload.doc.id;
          return data;
        });

      }));
  }
  getOneEmpleado(id: string) {
    this.empleadodoc = this.firestore.doc<Empleado>(`empleados/${id}`);
    return this.empleado = this.empleadodoc.snapshotChanges().pipe(map(action => {

      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as Empleado;
        data.id = action.payload.id;
        return data;
      }
    }));
  }
  addEmpleado(empleado: Empleado): void {
    this.empleadosCollection.add(empleado);
  }
  updateEmpleado(empleado: Empleado): void {
    const id = empleado.id;
    this.empleadodoc = this.firestore.doc<Empleado>(`empleados/${id}`);
    this.empleadodoc.update(empleado);
  }

  deleteEmpleado(id: string): void {
    this.empleadodoc = this.firestore.doc<Empleado>(`empleados/${id}`);
    this.empleadodoc.delete();
  }

}
