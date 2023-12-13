import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { Empleado } from '../interfaces/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  private currentUser : number = 0;

  //public funcionUser : number = 0;

  constructor(private http:HttpClient) { 

    this.getEmpleados().subscribe(data=> {
      this.currentUser = data.Function
    })
  }

  getEmpleadosFuncion() : Observable<number> {
    
    const NoEmpleado = localStorage.getItem('NoEmpleado');

    const url = '/server/profile?id=' + NoEmpleado

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
  
    return this.http.get<Empleado>(url , {headers}).pipe(
      tap((data) => {
        console.log(data);
        
        this.setFuncion(data)
      }),
      map((data)=> {
        return data.Function
      })
    )
  }
  
  getEmpleados() : Observable<Empleado> {
    
    const NoEmpleado = localStorage.getItem('NoEmpleado');

    const url = '/server/profile?id=' + NoEmpleado

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
  
    return this.http.get<Empleado>(url , {headers}).pipe(
      tap((data) => {
        console.log(data);
        
        this.setFuncion(data)
      })
    )
  }

  hasCiles(): Observable<boolean> {
    const hasCilesValue = !!localStorage.getItem('CILES');
    return of(hasCilesValue);
  }

  getFuncion() {
    return this.currentUser
  }

  setFuncion(data : Empleado){
     this.currentUser = data.Function
  }
  
}
