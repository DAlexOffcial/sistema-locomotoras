import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mensaje } from '../interfaces/usuarios';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private http: HttpClient) { }

  getDataCatalogos( NoEmpleado: number , contraseñaActual : string , NuevaContaseña : string): Observable<Mensaje> {
    console.log(NoEmpleado , contraseñaActual , NuevaContaseña)
    const body = this.getBody(NoEmpleado , contraseñaActual ,NuevaContaseña  )
    const apiUrl = `/server/updatePassword`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });

    return this.http.patch<Mensaje>(apiUrl, body ,{ headers })
  }

  getBody(NoEmpleado: number , contraseñaActual : string , NuevaContaseña : string): any{
    return {
      "Username": NoEmpleado,
      "Password": contraseñaActual,
      "ConfirmPassword":  NuevaContaseña
    }
  }
}