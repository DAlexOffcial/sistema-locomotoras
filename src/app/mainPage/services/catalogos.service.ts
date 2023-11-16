import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, map } from 'rxjs';
import { Catalog, CatalogoCil, Cil } from '../interfaces/catalogos-cil';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  constructor(private http: HttpClient) { }
  

  public data: Cil[] = [];

  public getDataCil(catalogo: string): Observable<Catalog> {

    const apiUrl = '/server/getCatalogData?catalog=' + catalogo

    const token = localStorage.getItem('token')
    console.log(token)
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token })
    console.log(headers)
    return this.http.post<CatalogoCil>(`${apiUrl}`, null, { headers }).pipe(
      map(data => {
        this.data = data.Catalog.datos;
        console.log("se cargo en el servicio");
        console.log(this.data)
        //this.setDataCil(this.data)

        /*this.actulizarVariable(this.data)*/
        return data.Catalog
      })
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
