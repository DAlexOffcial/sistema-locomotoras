import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { Empleado, Funcione } from 'src/app/mainPage/interfaces/catalogos';
import { Usuario } from 'src/app/mainPage/interfaces/usuarios';

import { UsuarioService } from 'src/app/mainPage/services/Usuario.service';
import { CatalogosService } from 'src/app/mainPage/services/catalogos.service';
import { HabilitarService } from 'src/app/mainPage/services/edit.service';
import { CilService } from 'src/app/services/Cil.service';
import { OperarioService } from 'src/app/services/Operario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-empleados',
  templateUrl: './add-empleados.component.html',
  styleUrls: ['./add-empleados.component.css']
})
export class AddEmpleadosComponent {

  dataEmpleado!: Empleado

  dataUsuario: Usuario = {
    EmployeeNumber: 0,
    Password: '',
    GivenName: '',
    LastName: '',
    Function: 0,
    Access: '',
    Status: false,
    RecordDate: '',
    UpdateDate: ''
  }

  Empleadosforms: FormGroup

  SelecionarRoles: string = ''

  SelecionarCiles: string = ''

  valorConvertido : number = 0

  funciones: Funcione[] = [] 

  constructor(private dialog: MatDialog, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private _tablaService: HabilitarService, private _usuariosService: UsuarioService , private _operarioService : OperarioService , private _cilService : CilService , private _catalogosService: CatalogosService) {
    const SoloNumeros = /^[0-9]*$/;
    this.Empleadosforms = this.fb.group({
      nombre_empl: ['', Validators.required],
      apellido_empl: ['', Validators.required],
      fk_funcion_empl: ['', Validators.required],
      acceso_cil: ['', Validators.required],
      id_empleado: ['', [Validators.required , Validators.maxLength(11) , Validators.pattern(SoloNumeros)]],
      Password: ['', Validators.required],
    })
   
    _catalogosService.getDataCatalogos('funciones').subscribe(data => {
      this.funciones = data;
      const seleccionarFunciones = this.funciones.map(m => m.desc_funcion).join(',');
      this.SelecionarRoles = seleccionarFunciones;
    });

    this.dataEmpleado = data.element

    const funcion = _operarioService.decrypt(localStorage.getItem('funcion') ?? '')
   
    
    switch (funcion) {
      case '2':
          this.SelecionarRoles = 'MAESTRO,MAYORDOMO,OPERARIO'
        break;
      case '3':
           this.SelecionarRoles = 'MAYORDOMO,OPERARIO'
        break;
    }

    
    this.SelecionarCiles = _operarioService.decrypt( localStorage.getItem('CILES') ?? '')

    if(this.SelecionarCiles == 'TODAS'){
      _cilService.getDataCatalogos().pipe(
        map(data => data.map(item => item.id_cil).join(','))
      ).subscribe(concatenatedIds => {
        this.SelecionarCiles = concatenatedIds
      });
  }
    
  }

  close() {
    this.Empleadosforms.clearValidators(); // Limpiar validadores
    this.Empleadosforms.updateValueAndValidity();
    this.dialog.closeAll();
  }

  editForm() {
    if (this.Empleadosforms.valid) {
      const NombreEmple: string = this.Empleadosforms.value.nombre_empl;
      const ApellidoEmple: string = this.Empleadosforms.value.apellido_empl;

      const funcion = this.funciones.find(m => m.desc_funcion.trim().toUpperCase() === this.Empleadosforms.value.fk_funcion_empl.trim().toUpperCase());

      if (funcion) {
        this.valorConvertido = funcion.id_funcion;
      } else {
        
        // Puedes agregar más información de depuración si es necesario
      }

      const FuncionEmple : number =  this.valorConvertido;
      const AccesoCil: string[] = this.Empleadosforms.value.acceso_cil;
      const IdEmple: number = this.Empleadosforms.value.id_empleado;
      const Password: string = this.Empleadosforms.value.Password;
      
      this.dataEmpleado.nombre_empl = NombreEmple.toUpperCase();
      this.dataEmpleado.apellido_empl = ApellidoEmple.toUpperCase();
      this.dataEmpleado.fk_funcion_empl = FuncionEmple
      this.dataEmpleado.acceso_cil = AccesoCil.toString();
      this.dataEmpleado.id_empleado = IdEmple
      this.dataUsuario.Password = Password

      if (this.data.TipoBoton == 'add') {

        this._catalogosService.agregarEmpleado(this.dataEmpleado).subscribe(
          (data) => {
      
            Swal.fire({
              title: 'Registro agregado!',
              icon: 'success',
            });
            this.insertarUsuario(this.dataEmpleado , this.dataUsuario)
            this._tablaService.TriggerTabla('empleados');
            this.close();
          },
          (error) => {
       
            this._tablaService.TriggerTabla('empleados');
          }
        );
      } else if (this.data.TipoBoton == 'edit') {
        
      } 
    } else {
      this.Empleadosforms.markAllAsTouched();
    }
  }

  insertarUsuario(Empleado : Empleado , Usuario : Usuario){

    this._usuariosService.CreateUsuario(Empleado , Usuario).subscribe(data => {
    })
  }
  
}
