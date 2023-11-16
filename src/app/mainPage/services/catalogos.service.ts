import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, map, of } from 'rxjs';
import { Catalog, CatalogCil, Cil } from '../interfaces/catalogos-cil';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  constructor(private http: HttpClient) { }
  
  public getDataCil(catalogo: string): Observable<CatalogCil> {

    const apiUrl = '/server/getCatalogData?catalog=' + catalogo

    const token = localStorage.getItem('token')
    console.log(token)
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token })
    console.log(headers)
    return this.http.post<CatalogCil>(`${apiUrl}`, null, { headers }).pipe(
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
  }



/*  private dataCatalogoCil = new Subject<Cil[]> 

  setDataCil(data: Cil[]){
    //console.log('SE GUARDA LA DATA EN EL SERVICIO' , data)
    this.dataCatalogoCil.next(data)
  }

   getDataCatalogCil(){
    //console.log('SE OBTIENE LA DATA DEL SERVICIO')
    return this.dataCatalogoCil.asObservable();
   }
*/
   
}
