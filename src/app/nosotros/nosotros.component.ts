import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EquipoService } from './../equipo/equipo.service';
import { Empleado } from '../equipo/empleado';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css']
})
export class NosotrosComponent implements OnInit {

  constructor(private equipo: EquipoService) { }
  public empleados = [];
  public empleado = '';

  ngOnInit() {
    this.equipo.getEmpleados().subscribe(empleados => {
      this.empleados = empleados;
    });
  }

  getUrl() {
    return 'url("../../assets/imagenes/fondo3.jpg")';
  }

  onDeleteEmpleado(id: string) {
    const confirmacion = confirm('Estas seguro de eliminar este empleado');
    if (confirmacion) {
      this.equipo.deleteEmpleado(id);
    }
  }
  onPreUpdate(empleado: Empleado) {
    this.equipo.selectedEmpleado = Object.assign({}, empleado);
  }


}
