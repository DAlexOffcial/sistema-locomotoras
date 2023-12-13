import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Catalogos, Empleado } from '../interfaces/catalogos';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosTablaService {

  constructor(private http: HttpClient) { }

  getDataCatalogos(): Observable<Catalogos> {
    const CIL = localStorage.getItem('CIL')
    const apiUrl = `/server/getCatalogData?catalog=empleados&cil=${CIL}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });

    return this.http.post<Catalogos>(apiUrl, null, { headers })
  }

  cambiarEstatus( element: Empleado): Observable<string> {
    
    const body = this.getBody(element)

    const CIL = localStorage.getItem('CIL')
    const apiUrl = `/server/saveCatalogData?catalog=empleados&cil=${CIL}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });

    return this.http.post<string>(apiUrl, body, { headers })
  }

  private getBody(element : Empleado) : any{
    return {
      "Id": element.id_empleado,
      "Catalog": "empleados",
      "CatalogConcepts": [
        {
          "Key": "id_empleado",
          "Value": element.id_empleado
        },
        {
          "Key": "nombre_empl",
          "Value": element.nombre_empl
        },
        {
          "Key": "apellido_empl",
          "Value": element.apellido_empl
        },
        {
          "Key": "fk_funcion_empl",
          "Value": element.fk_funcion_empl
        },
        {
          "Key": "acceso_cil",
          "Value": element.acceso_cil
        },
        {
          "Key": "activo",
          "Value": element.activo 
        },
      ]
    };
  }

  agregarEmpleado( element: Empleado): Observable<string> {
    
    const body = this.getBodyAdd(element)

    const CIL = localStorage.getItem('CIL')
    const apiUrl = `/server/saveCatalogData?catalog=empleados&cil=${CIL}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });

    return this.http.post<string>(apiUrl, body, { headers })
  }

  private getBodyAdd(element : Empleado) : any{
    return {
      "Id": "0",
      "Catalog": "empleados",
      "CatalogConcepts": [
        {
          "Key": "id_empleado",
          "Value": element.id_empleado
        },
        {
          "Key": "nombre_empl",
          "Value": element.nombre_empl
        },
        {
          "Key": "apellido_empl",
          "Value": element.apellido_empl
        },
        {
          "Key": "fk_funcion_empl",
          "Value": element.fk_funcion_empl
        },
        {
          "Key": "acceso_cil",
          "Value": element.acceso_cil 
        },
        {
          "Key": "activo",
          "Value": "0"
        },
      ]
    };
  }
  
}

