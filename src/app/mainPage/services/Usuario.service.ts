import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuarios';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }
  
  //obtener empleado
  getDataCatalogos(NoEmpleado :  number): Observable<Usuario> {
    const apiUrl = `/server/profile?id=${NoEmpleado}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });

    return this.http.get<Usuario>(apiUrl, { headers })
  }

  


}
