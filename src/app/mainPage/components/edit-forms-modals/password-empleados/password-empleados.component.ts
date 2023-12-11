import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Empleado } from 'src/app/mainPage/interfaces/catalogos';
import { Usuario } from 'src/app/mainPage/interfaces/usuarios';
import { PasswordService } from 'src/app/mainPage/services/Password.service';
import { UsuarioService } from 'src/app/mainPage/services/Usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-password-empleados',
  templateUrl: './password-empleados.component.html',
  styleUrls: ['./password-empleados.component.css']
})
export class PasswordEmpleadosComponent {

  dataUsuario!: Usuario

  dataEmpleado!: Empleado

  Usuarioforms: FormGroup

  constraseña: boolean = true

  mensaje: string = '' 

  constructor(private dialog: MatDialog, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private _usuariosService: UsuarioService , private _passwordService: PasswordService) {
    this.Usuarioforms = this.fb.group({
      contraseña1: ['', Validators.required],
      contraseña2: ['', Validators.required],
    })
    this.dataEmpleado = data.element
    console.log(this.dataEmpleado.id_empleado)
  }

  close() {
    this.Usuarioforms.clearValidators(); // Limpiar validadores
    this.Usuarioforms.updateValueAndValidity();
    this.dialog.closeAll();
  }

  editForm() {
    this.constraseña = true
    const contra1 = this.Usuarioforms.value.contraseña1;
    const contra2 = this.Usuarioforms.value.contraseña2;

    if(contra1 !== contra2){
      this.constraseña = false
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "tu contraseña no conside",
      });
    }
    
    if(this.Usuarioforms.valid && this.constraseña ){
    // consultar datos del usuario 
    this._usuariosService.getDataCatalogos(this.dataEmpleado.id_empleado).subscribe( data => {
      this.dataUsuario = data

      this._passwordService.getDataCatalogos(this.dataEmpleado.id_empleado , this.dataUsuario.Password , contra1 ).subscribe( data => {
        console.log(data);
        this.mensaje = data.Message
        Swal.fire({
          text: this.mensaje,
          icon: "success"
        });
        
      },
      error => {
        this.mensaje = error.Message
        Swal.fire({
          text: this.mensaje,
          icon: "error"
        });
      })

    })


    }else {
      this.Usuarioforms.markAllAsTouched();
    }
  }

}
