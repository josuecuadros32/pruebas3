import { ActivatedRoute, Params, Router } from '@angular/router';
import { Empleado } from './../equipo/empleado';
import { EquipoService } from './../equipo/equipo.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {
  constructor(private equipo: EquipoService, private ruta: ActivatedRoute, private router: Router) {}
  public empleado: Empleado = {};

  ngOnInit() {
    const id = this.ruta.snapshot.params['id'];
    this.getDetalles(id);
  }

  getDetalles(id: string): void {
    this.equipo.getOneEmpleado(id).subscribe(empleado => {
      this.empleado = empleado;
    });
  }
  getUrl() {
    return 'url("../../assets/imagenes/fondo3.jpg")';
  }
  onPreUpdate(empleado: Empleado) {
    this.equipo.selectedEmpleado = Object.assign({}, empleado);
  }

  onDeleteEmpleado(id: string) {
    const confirmacion = confirm('Estas seguro de eliminar este empleado');
    if (confirmacion) {
      this.equipo.deleteEmpleado(id);
      this.router.navigate(['/nosotros']);
    }
  }
}

