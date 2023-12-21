import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Acciones, Banio, Catalogos, Cil, Entregas, Funcione, InicialesLoco, Inspecciones, Locomotora, Mantenedore } from '../interfaces/catalogos';
@Injectable({
  providedIn: 'root'
})
export class CatalogosService {
  constructor(private http: HttpClient) { }
  /*public getDataCil(catalogo: string): Observable<Catalogos> {
    const apiUrl = '/api/getCatalogData?catalog=' + catalogo
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token })
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
  // obtener catalogos y generar tablas 
  /*private dataCatalog: Subject<string> = new Subject<string>()
  getCatlogo(catalogo : string) {
   this.dataCatalog.next(catalogo)
  }
  setCatalogo(){
    return this.dataCatalog
  }*/
  getDataCatalogos(catalogo: string): Observable<any> {
    const apiUrl = `/api/getCatalogData?catalog=${catalogo}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this.http.post<Catalogos>(apiUrl, null, { headers }).pipe(
      map(data => this.mapData(data, catalogo))
    );
  }
  private mapData(data: Catalogos, tipo: string): any {
    switch (tipo) {
      case 'cil':
        return data.Catalog.cil;
      case 'inspecciones':
        return data.Catalog.inspecciones
      case 'entregas':
        return data.Catalog.entregas
      case 'acciones':
        return data.Catalog.acciones
      case 'banios':
        return data.Catalog.banios
      case 'iniciales_locos':
        return data.Catalog.iniciales_locos
      case 'locomotoras':
        return data.Catalog.locomotoras
      case 'mantenedores':
        return data.Catalog.mantenedores
      case 'funciones':
        return data.Catalog.funciones
      // Agrega más casos según sea necesario para otros tipos de información
      default:
        throw new Error(`Tipo de catálogo no válido: ${tipo}`);
    }
  }
}
