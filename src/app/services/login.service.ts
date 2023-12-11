import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  //login 

  constructor(private http:HttpClient) { }
  
  postDatos(  NoEmpleado:number , Password:string): Observable<any> {
    
    const body = {
      Username: NoEmpleado,
      Password: Password
    }

    console.log(body);
    

    const url = '/server/login/authenticate?' 

    return this.http.post<any>(url , body)
  }

  guardarNoEmpleado(NoEmpleado : string) :void{
    console.log(NoEmpleado)
    localStorage.removeItem("NoEmpleado");
    localStorage.setItem('NoEmpleado' , NoEmpleado )
  }

  guardarToken(token : string) :void{
    console.log(token)
    localStorage.removeItem("token");
    localStorage.setItem('token' , token )
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

}
