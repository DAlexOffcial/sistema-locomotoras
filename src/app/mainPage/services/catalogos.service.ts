import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { Acciones, Banio, Catalog, Catalogos, Cil, Entregas, InicialesLoco, Inspecciones, Locomotora, Mantenedore } from '../interfaces/catalogos-cil';
import { MatDialog } from '@angular/material/dialog';
import { AddModalMainPageComponent } from '../components/add-modal-main-page/add-modal-main-page.component';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  constructor(private http: HttpClient ,  private matDialog:MatDialog) { }
  
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
        cil: data.Catalog.cil.map((cil: Cil) => ({ ...cil,
        activo: cil.activo === '1' ? 'ACTIVO' : 'INACTIVO'
        }))
      }
    };
  }

  private mapInspeccionesData(data: any): any {
    return {
      ...data,
      Catalog: {
        ...data.Catalog,
        inspecciones: data.Catalog.inspecciones.map((inspecciones: Inspecciones) => ({ ...inspecciones,
        activo: inspecciones.activo === '1' ? 'ACTIVO' : 'INACTIVO' }))
      }
    };
  }

  private mapEntregasData(data: any): any {
    return {
      ...data,
      Catalog: {
        ...data.Catalog,
        entregas: data.Catalog.entregas.map((entregas: Entregas) => ({ ...entregas,
        activo: entregas.activo === '1' ?  'ACTIVO' : 'INACTIVO'}))
      }
    };
  }

  private mapAccionesData(data: any): any {
    return {
      ...data,
      Catalog: {
        ...data.Catalog,
        acciones: data.Catalog.acciones.map((acciones: Acciones) => ({ ...acciones,
        activo: acciones.activo === '1' ? 'ACTIVO' : 'INACTIVO' }))
      }
    };
  }

  private mapBaniosData(data: any): any {
    return {
      ...data,
      Catalog: {
        ...data.Catalog,
        banios: data.Catalog.banios.map((banios: Banio) => ({ ...banios,
        activo: banios.activo === '1' ? 'ACTIVO' : 'INACTIVO'}))
      }
    };    
  } 

  private mapInicialesLocoData(data: any): any {
    return {
      ...data,
      Catalog: {
        ...data.Catalog,
        iniciales_locos: data.Catalog.iniciales_locos.map((iniciales_locos: InicialesLoco) => ({ ...iniciales_locos,
        activo: iniciales_locos.activo === '1' ? 'ACTIVO' : 'INACTIVO'
        }))
      }
    };
  }
  private mapLocomotorasData(data: any): any {
    return {
      ...data,
      Catalog: {
        ...data.Catalog,
        locomotoras: data.Catalog.locomotoras.map((locomotoras: Locomotora) => ({ ...locomotoras,
        activo: locomotoras.activo === '1' ? 'ACTIVO' : 'INACTIVO'
        }))
      }
    };
  }

  private mapMantenedoresData(data: any): any {
    return {
      ...data,
      Catalog: {
        ...data.Catalog,
        mantenedores: data.Catalog.mantenedores.map((mantenedores: Mantenedore) => ({ ...mantenedores,
        activo: mantenedores.activo === '1' ? 'ACTIVO' : 'INACTIVO'
        }))
      }
    };
  }


  //modals
  openAddDialog() : void {
    this.matDialog.open(AddModalMainPageComponent , {
      width: '60%',
      height : '800px'
    })
  }
    
}
