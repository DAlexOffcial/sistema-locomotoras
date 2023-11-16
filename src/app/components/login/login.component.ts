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
      console.log(error)
     this.errorAlert('Usuario o contraseña')
    })

    /*this._loginService.getDataCil('cil').subscribe(data => {
        console.log('inicia la suscripcion en login' , data)
        this._loginService.setDataCil(data.Catalog.datos)
    })*/

  }

  IrLick() : void {
    this.router.navigateByUrl('recover')
  }

  errorAlert( error : string ): any {
    Swal.fire({  
      icon: 'error',  
      title: 'Oops...',  
      text: '',
      padding: 0,
    }) 
  }
}
