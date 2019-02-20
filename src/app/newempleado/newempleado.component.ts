import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Empleado } from './../equipo/empleado';
import { EquipoService } from './../equipo/equipo.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-newempleado',
  templateUrl: './newempleado.component.html',
  styleUrls: ['./newempleado.component.css']
})
export class NewempleadoComponent implements OnInit {
  constructor(
    public equiposervice: EquipoService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  @ViewChild('btnRegresar') btnRegresar: ElementRef;

  ngOnInit() {}
  getUrl() {
    return 'url("../../assets/imagenes/fondo3.jpg")';
  }

  onsaveEmpleado(FormEmpleado: NgForm): void {
    if (FormEmpleado.value.id === null) {
      this.equiposervice.addEmpleado(FormEmpleado.value);
      this.toastr.success('', 'Empleado guardado con exito');
    } else {
      this.equiposervice.updateEmpleado(FormEmpleado.value);
      this.toastr.success('', 'Modificado con exito');
    }
    FormEmpleado.resetForm();
    this.btnRegresar.nativeElement.click();
  }
}
