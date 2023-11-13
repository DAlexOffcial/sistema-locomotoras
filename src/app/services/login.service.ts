import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient ) { }
  
  postDatos(  NoEmpleado:number , Password:string): Observable<any> {
    
    const body = {
      Username: NoEmpleado,
      Password: Password
    }
    const url = '/server/login/authenticate' 

    return this.http.post(url , body) 
  }

  guardarToken(token : string):void{
    console.log(token)
     localStorage.setItem('token' , token )
  }

  errorAlert( error : string ): any {
    Swal.fire({  
      icon: 'error',  
      title: 'Oops...',  
      text: error,
      padding: 0,
    }) 
  }
}
