import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { Empleado } from 'src/app/mainPage/interfaces/catalogos';
import { Usuario } from 'src/app/mainPage/interfaces/usuarios';
import { EmpleadosTablaService } from 'src/app/mainPage/services/EmpleadosTabla.service';
import { TablasService } from 'src/app/mainPage/services/Tablas.service';
import { UsuarioService } from 'src/app/mainPage/services/Usuario.service';
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

  SelecionarRoles: string = 'SUPERVISOR,MAESTRO,MAYORDOMO,OPERARIO'

  SelecionarCiles: string = ''

  valorConvertido : number = 0

  constructor(private dialog: MatDialog, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private _tablaService: TablasService, private _empleadosTablaService :EmpleadosTablaService, private _usuariosService: UsuarioService , private _operarioService : OperarioService , private _cilService : CilService) {
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

    const funcion = _operarioService.decrypt(localStorage.getItem('funcion') ?? '')
    console.log(funcion);
    
    switch (funcion) {
      case '2':
          this.SelecionarRoles = 'MAESTRO,MAYORDOMO,OPERARIO'
        break;
      case '3':
           this.SelecionarRoles = 'MAYORDOMO,OPERARIO'
        break;
    }
    
    console.log(this.dataEmpleado);
    
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

      switch (this.Empleadosforms.value.fk_funcion_empl) {
        case 'SUPERVISOR':
          this.valorConvertido = 1;
          break;
        case 'MAESTRO':
          this.valorConvertido = 2;
          break;
        case 'MAYORDOMO':
          this.valorConvertido = 3;
          break;
        case 'OPERARIO':
          this.valorConvertido = 4;
          break;
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
