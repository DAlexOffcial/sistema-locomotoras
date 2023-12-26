import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuarios';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Empleado } from 'src/app/mainPage/interfaces/catalogos';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }
  
  //obtener empleado
  getDataCatalogos(NoEmpleado:  number): Observable<Usuario> {
    const apiUrl = `/api/profile?id=${NoEmpleado}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });

    return this.http.get<Usuario>(apiUrl, { headers })
  }

  editUsuario( Empleado : Empleado , Usuario : Usuario): Observable<string>{
    
    const apiUrl = `api/updateUserInfo?`;
    const body = this.getBody(Empleado , Usuario )
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
  
    return this.http.put<string>(apiUrl, body, { headers }); 
  }

  getBody(Empleado: Empleado , Usuario : Usuario ): any{
    return {
      "EmployeeNumber": Empleado.id_empleado.toString(),
      "Password": Usuario.Password ,
      "GivenName": Empleado.nombre_empl,
      "LastName": Empleado.apellido_empl,
      "Function": Empleado.fk_funcion_empl,
      "Access": Empleado.acceso_cil,
      "Status": Usuario.Status
    }
  }


  CreateUsuario( Empleado : Empleado , Usuario : Usuario): Observable<string>{
    
    const apiUrl = `api/updateUserInfo?`;
    const body = this.getBody(Empleado , Usuario )
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
  
    return this.http.put<string>(apiUrl, body, { headers }); 
  }

}
