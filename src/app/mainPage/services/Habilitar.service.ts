import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabilitarService {

  constructor(private http : HttpClient) { }
  

  cambiarEstatus(catalogo: string , element: any):Observable<any>{
    const body = this.getBody(catalogo  , element)

    const apiUrl = '/server/saveCatalogData';
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });

    return this.http.post<any>(apiUrl, body, { headers })
  }

  private getBody( catalo: string , element: any): any {
    switch (catalo) {
      case 'acciones':
        return {
          "Id": element.id_accion,
          "Catalog": "acciones",
          "CatalogConcepts": [
            {
              "Key": "id_accion",
              "Value": element.id_accion
            },
            {
              "Key": "desc_accion",
              "Value": element.desc_accion
            },
            {
              "Key": "activo",
              "Value": element.activo
            }
          ]
        };
      // Agrega más casos según sea necesario para otros tipos de información
      default:
        throw new Error(`Tipo de catálogo no válido: ${catalo}`);
    }
  }
}
