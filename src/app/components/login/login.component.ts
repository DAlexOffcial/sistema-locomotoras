import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpleadosService } from 'src/app/services/Empleados.service';
import { OperarioService } from 'src/app/services/Operario.service';
import { LoginService } from 'src/app/services/login.service';
import { ModalAuthService } from 'src/app/services/modalAuth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  loginUsuario: FormGroup;

  // private _loginService = inject( LoginService )

  constructor(private fb: FormBuilder, private router: Router, private _loginService: LoginService, private _modalAuthService: ModalAuthService, private _empleadosServices: EmpleadosService, private _operarioService: OperarioService) {
    localStorage.removeItem("NoEmpleado");
    localStorage.removeItem("CIL");
    localStorage.removeItem("CILES");
    localStorage.removeItem('token');
    localStorage.removeItem('funcion')
    localStorage.removeItem('fecha')

    this.loginUsuario = this.fb.group({
      NoEmpleado: ['', Validators.required],
      Password: ['', Validators.required],
    })
  }

  login() {
    
    
    const NoEmpleado = this.loginUsuario.value.NoEmpleado
    const Password = this.loginUsuario.value.Password
    if (this.loginUsuario.valid) {

      this._loginService.postDatos(NoEmpleado, Password).subscribe(data => {
        this._loginService.guardarNoEmpleado(NoEmpleado)
        this._loginService.guardarToken(data.token)
        this._empleadosServices.getEmpleados().subscribe(data => {
          localStorage.removeItem('funcion')
          localStorage.setItem('funcion', this._operarioService.encrypt(data.Function.toString()))
          this._modalAuthService.checkTokenExpiration()
          this.router.navigate(['/chose-cil'])
        })

      }, (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'contraseña incorrecta',
          padding: 0,
        })

      })
    }else {
      this.loginUsuario.markAllAsTouched();
    }
  }

}
