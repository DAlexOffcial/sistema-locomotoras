import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, map, of } from 'rxjs';
import { Catalog, Catalogos, Cil, Inspecciones } from '../interfaces/catalogos-cil';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  constructor(private http: HttpClient) { }
  
  /*public getDataCil(catalogo: string): Observable<Catalogos> {

    const apiUrl = '/server/getCatalogData?catalog=' + catalogo

    const token = localStorage.getItem('token')
    console.log(token)
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token })
    console.log(headers)
    return this.http.post<Catalogos>(`${apiUrl}`, null, { headers }).pipe(
      map(data => ({
        ...data,
        Catalog: {
          ...data.Catalog,
          cil: data.Catalog.cil.map(cil => ({
            ...cil,
            activo: cil.activo === '1' ? 'Activo' : 'NoActivo'
          }))
        }
      }))
    )
  } */

  getDataCil(catalogo: string): Observable<any> {
    const apiUrl = `/server/getCatalogData?catalog=${catalogo}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });

    return this.http.post<any>(apiUrl, null, { headers }).pipe(
      map(data => this.mapData(data, catalogo))
    );
  }

  private mapData(data: any, tipo: string): any {
    switch (tipo) {
      case 'cil':
        return this.mapCilData(data);
      case 'inspecciones':
        return this.mapInspeccionesData(data);
      case 'entregas':
        return this.mapEntregasData(data);
      case 'acciones':
        return this.mapAccionesData(data);
      case 'banios':
        return this.mapBaniosData(data);
      // Agrega más casos según sea necesario para otros tipos de información
      default:
        throw new Error(`Tipo de catálogo no válido: ${tipo}`);
    }
  }

  private mapCilData(data: any): any {
    return {
      ...data,
      Catalog: {
        ...data.Catalog,
        cil: data.Catalog.cil.map((cil: Cil) => ({ ...cil }))
      }
    };
  }

  private mapInspeccionesData(data: any): any {
    return {
      ...data,
      Catalog: {
        ...data.Catalog,
        inspecciones: data.Catalog.inspecciones.map((inspecciones: Inspecciones) => ({ ...inspecciones }))
      }
    };
  }

  private mapEntregasData(data: any): any {
 
  }

  private mapAccionesData(data: any): any {
    
  }

  private mapBaniosData(data: any): any {
    
  }
   
}
