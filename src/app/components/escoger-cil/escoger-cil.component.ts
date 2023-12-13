import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/interfaces/empleado';
import { EmpleadosService } from 'src/app/services/Empleados.service';

@Component({
  selector: 'app-escoger-cil',
  templateUrl: './escoger-cil.component.html',
  styleUrls: ['./escoger-cil.component.css']
})
export class EscogerCilComponent {

  empleado: Empleado = {
    EmployeeNumber: 0,
    Password: '',
    GivenName: '',
    LastName: '',
    Function: 0,
    Access: '',
    //Status: false,
    Status: true,
    RecordDate: '',
    UpdateDate: ''
  }

  CilSeleccionado: string = ''

  mensaje: boolean = false

  constructor(private _empleadosService: EmpleadosService, private router: Router) {
    localStorage.removeItem("CIL");
    localStorage.removeItem("CILES");
    this.getEmpleado()
  }

  getEmpleado(){
    this._empleadosService.getEmpleados().subscribe(data => {
      this.empleado = data
    })
  }

  logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("NoEmpleado");
    localStorage.removeItem("CIL");
    localStorage.removeItem("CILES");
    this.router.navigate(['/login'])
  }

  enviarDatos() {
    localStorage.removeItem("CIL");
    localStorage.removeItem("CILES");
    localStorage.setItem('CIL', this.CilSeleccionado)
    localStorage.setItem('CILES', this.empleado.Access)
    if (this.CilSeleccionado !== '') {
      this.router.navigate(['/dashboard'])
    } else {
      this.mensaje = true
    }
  }
}