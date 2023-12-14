import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Empleado } from 'src/app/mainPage/interfaces/catalogos';
import { Usuario } from 'src/app/mainPage/interfaces/usuarios';
import { EmpleadosTablaService } from 'src/app/mainPage/services/EmpleadosTabla.service';
import { TablasService } from 'src/app/mainPage/services/Tablas.service';
import { UsuarioService } from 'src/app/mainPage/services/Usuario.service';
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

  SelecionarRoles: string = '1,2,3,4'

  SelecionarCiles: string = ''

  constructor(private dialog: MatDialog, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private _tablaService: TablasService, private _empleadosTablaService :EmpleadosTablaService, private _usuariosService: UsuarioService , private _operarioService : OperarioService) {
    const SoloNumeros = /^[0-9]*$/;
    this.Empleadosforms = this.fb.group({
      nombre_empl: ['', Validators.required],
      apellido_empl: ['', Validators.required],
      fk_funcion_empl: ['', Validators.required],
      acceso_cil: ['', Validators.required],
      id_empleado: ['', [Validators.required , Validators.maxLength(11) , Validators.pattern(SoloNumeros)]],
      Password: ['', Validators.required],
    })

    this.dataEmpleado = data.element
    
    console.log(this.dataEmpleado);
    
    this.SelecionarCiles =  _operarioService.decrypt( localStorage.getItem('CILES') ?? '')
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
      const IdEmple: number = this.Empleadosforms.value.id_empleado;
      const Password: string = this.Empleadosforms.value.Password;
      
      this.dataEmpleado.nombre_empl = NombreEmple.toUpperCase();
      this.dataEmpleado.apellido_empl = ApellidoEmple.toUpperCase();
      this.dataEmpleado.fk_funcion_empl = FuncionEmple
      this.dataEmpleado.acceso_cil = AccesoCil.toString();
      this.dataEmpleado.id_empleado = IdEmple
      this.dataUsuario.Password = Password

      if (this.data.TipoBoton == 'add') {

        console.log(this.dataEmpleado);
        this._empleadosTablaService.agregarEmpleado(this.dataEmpleado).subscribe(
          (data) => {
            console.log(JSON.stringify(data));
            Swal.fire({
              title: 'Registro agregado!',
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
      } else if (this.data.TipoBoton == 'edit') {
        
      } else {
        // Handle other scenarios if needed
      }
    } else {
      this.Empleadosforms.markAllAsTouched();
    }
  }

  insertarUsuario(Empleado : Empleado , Usuario : Usuario){
    console.log(Empleado , Usuario );
    this._usuariosService.CreateUsuario(Empleado , Usuario).subscribe(data => {
      console.log(data); 
    })
  }
  
}
