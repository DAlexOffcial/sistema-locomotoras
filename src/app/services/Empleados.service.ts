import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Empleado } from '../interfaces/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  constructor(private http:HttpClient) { }

  getEmpleados() : Observable<Empleado> {
    const NoEmpleado = localStorage.getItem('NoEmpleado');

    const url = '/server/profile?id=' + NoEmpleado

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
  
    return this.http.get<Empleado>(url , {headers})
  }

  hasCiles(): Observable<boolean> {
    const hasCilesValue = !!localStorage.getItem('CILES');
    return of(hasCilesValue);
  }
}
