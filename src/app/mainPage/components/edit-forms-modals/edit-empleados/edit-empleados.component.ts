import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Empleado } from 'src/app/mainPage/interfaces/catalogos';
import { Usuario } from 'src/app/mainPage/interfaces/usuarios';
import { CreateService } from 'src/app/mainPage/services/Create.service';
import { EmpleadosTablaService } from 'src/app/mainPage/services/EmpleadosTabla.service';
import { TablasService } from 'src/app/mainPage/services/Tablas.service';
import { UsuarioService } from 'src/app/mainPage/services/Usuario.service';
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

  SelecionarRoles: string = '1,2,3,4'

  SelecionarCiles: string = ''

  constructor(private dialog: MatDialog, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private _tablaService: TablasService, private _empleadosTablaService :EmpleadosTablaService ,private _usuariosService: UsuarioService , private _operarioService : OperarioService) {
    this.Empleadosforms = this.fb.group({
      nombre_empl: ['', Validators.required],
      apellido_empl: ['', Validators.required],
      fk_funcion_empl: ['', Validators.required],
      acceso_cil: ['', Validators.required]
    })

    this.dataEmpleado = data.element

    this._usuariosService.getDataCatalogos(this.dataEmpleado.id_empleado).subscribe(data => {
      this.dataUsuario = data
      console.log(this.dataUsuario);
   })
 
    this.SelecionarCiles = _operarioService.decrypt(localStorage.getItem('CILES') ?? '')

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
      const FuncionEmple : number = this.Empleadosforms.value.fk_funcion_empl;
      const AccesoCil: string[] = this.Empleadosforms.value.acceso_cil;
    
      this.dataEmpleado.nombre_empl = NombreEmple.toUpperCase();
      this.dataEmpleado.apellido_empl = ApellidoEmple.toUpperCase();
      this.dataEmpleado.fk_funcion_empl = FuncionEmple
      this.dataEmpleado.acceso_cil = AccesoCil.toString()

      if (this.data.TipoBoton == 'add') {

      } else if (this.data.TipoBoton == 'edit') {        
        this._empleadosTablaService.cambiarEstatus(this.dataEmpleado).subscribe(
          (data) => {
            console.log(JSON.stringify(data));
            Swal.fire({
              title: 'Registro editado!',
              icon: 'success',
            });
            this.insertarUsuario(this.dataEmpleado , this.dataUsuario)
            this._tablaService.TriggerTabla('empleados');
            this.close();
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        // Handle other scenarios if needed
      }
    } else {
      this.Empleadosforms.markAllAsTouched();
    }
  }

  insertarUsuario(Empleado : Empleado , Usuario : Usuario){
    console.log(Empleado , Usuario );
    this._usuariosService.editUsuario(Empleado , Usuario).subscribe(data => {
      console.log(data);
      
    })
  }

}
