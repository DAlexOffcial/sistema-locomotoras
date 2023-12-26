import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Catalog, Catalogos, Cil } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class CilService {

  constructor(private http: HttpClient) { }
   
  getDataCatalogos(): Observable<Cil[]> {
    const apiUrl = `/api/getCatalogData?catalog=cil`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
  
    return this.http.post<Catalogos>(apiUrl, null, { headers }).pipe(
      map(data => data.Catalog.cil)
    );
  }

}
