import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Empleado } from 'src/app/mainPage/interfaces/catalogos';
import { CreateService } from 'src/app/mainPage/services/Create.service';
import { EmpleadosTablaService } from 'src/app/mainPage/services/EmpleadosTabla.service';
import { TablasService } from 'src/app/mainPage/services/Tablas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-empleados',
  templateUrl: './edit-empleados.component.html',
  styleUrls: ['./edit-empleados.component.css']
})
export class EditEmpleadosComponent {
  
  dataEmpleado!: Empleado

  Empleadosforms: FormGroup

  SelecionarRoles: string = '1,2,3,4'

  SelecionarCiles: string = ''

  constructor(private dialog: MatDialog, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private _createServices: CreateService, private _tablaService: TablasService, private _empleadosTablaService :EmpleadosTablaService) {
    this.Empleadosforms = this.fb.group({
      nombre_empl: ['', Validators.required],
      apellido_empl: ['', Validators.required],
      fk_funcion_empl: ['', Validators.required],
      acceso_cil: ['', Validators.required]
    })

    this.dataEmpleado = data.element

    this.SelecionarCiles = localStorage.getItem('CILES') ?? ''

    console.log(this.dataEmpleado.nombre_empl)
    console.log(this.dataEmpleado.apellido_empl)
    console.log(this.dataEmpleado.fk_funcion_empl)
    console.log(this.dataEmpleado.acceso_cil)
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
}
