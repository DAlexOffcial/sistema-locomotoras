import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/interfaces/empleado';
import { Cil } from 'src/app/interfaces/login';
import { CilService } from 'src/app/services/Cil.service';
import { EmpleadosService } from 'src/app/services/Empleados.service';
import { OperarioService } from 'src/app/services/Operario.service';

@Component({
  selector: 'app-escoger-cil',
  templateUrl: './escoger-cil.component.html',
  styleUrls: ['./escoger-cil.component.css'],
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

  cilArrayTodos: Cil[] = [];

  CilSeleccionado: string = ''

  mensaje: boolean = false

  constructor(private _CILService :CilService , private _empleadosService: EmpleadosService, private router: Router, private _operarioService : OperarioService) {
    localStorage.removeItem("CIL");
    localStorage.removeItem("CILES");
    localStorage.removeItem('funcion')
    this.getEmpleado()
  }

  getEmpleado(){
    this._empleadosService.getEmpleados().subscribe(data => {
      this.empleado = data
      console.log(this.empleado.Access);
      this._CILService.getDataCatalogos().subscribe((data) => {
        this.cilArrayTodos = data.filter(cil => this.empleado.Access.split(',').includes(cil.id_cil));
      });

      if(this.empleado.Access === 'TODAS'){
        this._CILService.getDataCatalogos().subscribe(data => {
          this.cilArrayTodos = data;
        });

      }
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
    localStorage.setItem('CIL', this._operarioService.encrypt(this.CilSeleccionado))
    localStorage.setItem('CILES', this._operarioService.encrypt(this.empleado.Access))
    if (this.CilSeleccionado !== '') {
      this.router.navigate(['/dashboard'])
    } else {
      this.mensaje = true
    }
  }
}
