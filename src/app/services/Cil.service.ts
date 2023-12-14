import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Catalogos } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class CilService {

  constructor(private http: HttpClient) { }
   
  getDataCatalogos(): Observable<string> {
    const apiUrl = `/server/getCatalogData?catalog=cil`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
  
    return this.http.post<Catalogos>(apiUrl, null, { headers }).pipe(
      map(data => data.Catalog.cil.map(cil => cil.id_cil).join(','))
    );
  }

}
