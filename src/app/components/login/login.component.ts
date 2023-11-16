import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  
  loginUsuario: FormGroup;

  constructor(private fb: FormBuilder, private router :Router,  private _loginService: LoginService) {
    this.loginUsuario = this.fb.group({
      NoEmpleado:['', Validators.required],
      Password:['', Validators.required],
    })
  }
  login(){
    const NoEmpleado = this.loginUsuario.value.NoEmpleado
    const Password = this.loginUsuario.value.Password
    console.log( NoEmpleado , Password )
    
    this._loginService.postDatos(NoEmpleado , Password).subscribe( data => {
      //console.log(data.token)
      //this._loginService.getDataCil('cil')
      this._loginService.guardarToken(data.token)
      this.router.navigate(['/dashboard'])
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
