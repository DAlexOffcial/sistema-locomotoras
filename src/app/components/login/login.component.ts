import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/interfaces/empleado';
import { EmpleadosService } from 'src/app/services/Empleados.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  
  loginUsuario: FormGroup;

 // private _loginService = inject( LoginService )

  constructor(private fb: FormBuilder, private router :Router,  private _loginService: LoginService ,private _empleadosServices :EmpleadosService) {
    localStorage.removeItem("NoEmpleado");
    localStorage.removeItem("CIL");
    localStorage.removeItem("CILES");
    localStorage.removeItem('token');
    localStorage.removeItem('funcion')

    this.loginUsuario = this.fb.group({
      NoEmpleado:['1152', Validators.required],
      Password:['fxe123', Validators.required],
    })
  }

  login(){
    const NoEmpleado = this.loginUsuario.value.NoEmpleado
    const Password = this.loginUsuario.value.Password
    console.log( NoEmpleado , Password )

    this._loginService.guardarNoEmpleado(NoEmpleado)

    this._loginService.postDatos(NoEmpleado , Password).subscribe( data => {
      //this._empleadosServices.getEmpleados()
      this._loginService.guardarToken(data.token)
      this.router.navigate(['/chose-cil'])
    },(error) => {
      Swal.fire({  
        icon: 'error',  
        title: 'Oops...',  
        text: 'contraseña incorrecta',
        padding: 0,
      }) 
      console.log(error)
    })
  }

  IrLick() : void {
    this.router.navigateByUrl('recover')
  }

}
