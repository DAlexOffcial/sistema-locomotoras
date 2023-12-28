import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { Cil } from 'src/app/interfaces/login';
import { Empleado, Funcione } from 'src/app/mainPage/interfaces/catalogos';
import { Usuario } from 'src/app/mainPage/interfaces/usuarios';
import { UsuarioService } from 'src/app/mainPage/services/Usuario.service';
import { CatalogosService } from 'src/app/mainPage/services/catalogos.service';
import { HabilitarService } from 'src/app/mainPage/services/edit.service';
import { CilService } from 'src/app/services/Cil.service';
import { OperarioService } from 'src/app/services/Operario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-empleados',
  templateUrl: './edit-empleados.component.html',
  styleUrls: ['./edit-empleados.component.css']
})
export class EditEmpleadosComponent {
  
  dataEmpleado!: Empleado

  dataUsuario!: Usuario

  Empleadosforms: FormGroup

  SelecionarRoles: string = ''

  SelecionarCiles: string = ''

  valorConvertido : number = 0

  Cil: Cil[] = []

  funciones: Funcione[] = [] 

  constructor(private dialog: MatDialog, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private _tablaService: HabilitarService,private _usuariosService: UsuarioService , private _operarioService : OperarioService , private _cilService:  CilService , private _catalogosService: CatalogosService) {
    this.Empleadosforms = this.fb.group({
      nombre_empl: [''],
      apellido_empl: [''],
      fk_funcion_empl: [''],
      acceso_cil: ['']
    })

    _catalogosService.getDataCatalogos('funciones').subscribe(data => {
      this.funciones = data;
      const seleccionarFunciones = this.funciones.map(m => m.desc_funcion).join(',');
      this.SelecionarRoles = seleccionarFunciones;

      const funcion = _operarioService.decrypt(localStorage.getItem('funcion') ?? '')
    
      switch (funcion) {
        case '2':
            this.SelecionarRoles = 'MAESTRO,MAYORDOMO,OPERARIO'
          break;
        case '3':
             this.SelecionarRoles = 'MAYORDOMO,OPERARIO'
          break;
      }
      
    });

    this.dataEmpleado = data.element
        
    this._usuariosService.getDataCatalogos(this.dataEmpleado.id_empleado).subscribe(data => {
      this.dataUsuario = data
   })
 
    this.SelecionarCiles = _operarioService.decrypt(localStorage.getItem('CILES') ?? '')
    
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
      }
      
      const FuncionEmple : number = this.valorConvertido
      const AccesoCil: string[] = this.Empleadosforms.value.acceso_cil;

      if(NombreEmple.trim() === ''){
        this.dataEmpleado.nombre_empl 
      }else{
      this.dataEmpleado.nombre_empl = NombreEmple.toUpperCase();
      }

      if(ApellidoEmple.trim() === ''){
        this.dataEmpleado.apellido_empl
      }else{
      this.dataEmpleado.apellido_empl = ApellidoEmple.toUpperCase();
      }
       
      if(FuncionEmple === 0){
        this.dataEmpleado.fk_funcion_empl
      }else{
      this.dataEmpleado.fk_funcion_empl = FuncionEmple
      }
      if(AccesoCil[0] === undefined){   
        this.dataEmpleado.acceso_cil
      }else{
      this.dataEmpleado.acceso_cil = AccesoCil.toString()
      }

      if (this.data.TipoBoton == 'add') {

      } else if (this.data.TipoBoton == 'edit') {        
        this._catalogosService.editarEmpleado(this.dataEmpleado).subscribe(
          (data) => {

            Swal.fire({
              title: 'Registro editado!',
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
      } 
    } else {
      this.Empleadosforms.markAllAsTouched();
    }
  }

  insertarUsuario(Empleado : Empleado , Usuario : Usuario){

    this._usuariosService.editUsuario(Empleado , Usuario).subscribe(data => {

    }, error => {
      
      Swal.fire({
        title: 'Hubo un error al incertar el usario',
        icon: 'error',
      });
    })
  }
}
