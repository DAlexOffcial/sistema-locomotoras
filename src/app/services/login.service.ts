import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject, map } from 'rxjs';
import { CatalogosService } from '../mainPage/services/catalogos.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  //login 

  constructor(private http:HttpClient ,private _catalogServices : CatalogosService) { }
  
  postDatos(  NoEmpleado:number , Password:string): Observable<any> {
    
    const body = {
      Username: NoEmpleado,
      Password: Password
    }
    const url = '/server/login/authenticate' 

    return this.http.post(url , body) 
  }
  
  guardarToken(token : string):void{
    console.log(token)
     localStorage.setItem('token' , token )
  }


}
