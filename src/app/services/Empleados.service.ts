import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { Empleado } from '../interfaces/empleado';
import { OperarioService } from './Operario.service';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {


  constructor(private http:HttpClient ,  private _operarioService : OperarioService) { 

  }

  getEmpleados() : Observable<Empleado> {
    
    const NoEmpleado = this._operarioService.decrypt(localStorage.getItem('NoEmpleado') ?? '');

    const url = '/api/profile?id=' + NoEmpleado

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
  
    return this.http.get<Empleado>(url , {headers})
  }

}
