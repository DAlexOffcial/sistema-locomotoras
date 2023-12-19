import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Acciones, Banio, Cil, Entregas, Funcione, InicialesLoco, Inspecciones, Locomotora, Mantenedore } from '../interfaces/catalogos';


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
  
  // obtener catalogos y generar tablas 

  /*private dataCatalog: Subject<string> = new Subject<string>()
  
  getCatlogo(catalogo : string) {
   this.dataCatalog.next(catalogo)
  }

  setCatalogo(){
    console.log(this.dataCatalog)
    return this.dataCatalog
  }*/
    
  getDataCatalogos(catalogo: string): Observable<any> {
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
      case 'iniciales_locos':
        return this.mapInicialesLocoData(data);
      case 'locomotoras':
        return this.mapLocomotorasData(data);
      case 'mantenedores':
        return this.mapMantenedoresData(data);
      case 'funciones':
        return this.mapFuncionesData(data);
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
        cil: data.Catalog.cil.map((cil: Cil) => ({ ...cil}))
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
    return {
      ...data,
      Catalog: {
        ...data.Catalog,
        entregas: data.Catalog.entregas.map((entregas: Entregas) => ({ ...entregas }))
      }
    };
  }

  private mapAccionesData(data: any): any {
    return {
      ...data,
      Catalog: {
        ...data.Catalog,
        acciones: data.Catalog.acciones.map((acciones: Acciones) => ({ ...acciones }))
      }
    };
  }

  private mapBaniosData(data: any): any {
    return {
      ...data,
      Catalog: {
        ...data.Catalog,
        banios: data.Catalog.banios.map((banios: Banio) => ({ ...banios}))
      }
    };    
  } 

  private mapInicialesLocoData(data: any): any {
    return {
      ...data,
      Catalog: {
        ...data.Catalog,
        iniciales_locos: data.Catalog.iniciales_locos.map((iniciales_locos: InicialesLoco) => ({ ...iniciales_locos}))
      }
    };
  }
  private mapLocomotorasData(data: any): any {
    return {
      ...data,
      Catalog: {
        ...data.Catalog,
        locomotoras: data.Catalog.locomotoras.map((locomotoras: Locomotora) => ({ ...locomotoras }))
      }
    };
  }

  private mapMantenedoresData(data: any): any {
    return {
      ...data,
      Catalog: {
        ...data.Catalog,
        mantenedores: data.Catalog.mantenedores.map((mantenedores: Mantenedore) => ({ ...mantenedores}))
      }
    };
  }

  private mapFuncionesData(data: any): any {
    return {
      ...data,
      Catalog: {
        ...data.Catalog,
        funciones: data.Catalog.funciones.map((funciones: Funcione) => ({ ...funciones}))
      }
    };
  }
}
