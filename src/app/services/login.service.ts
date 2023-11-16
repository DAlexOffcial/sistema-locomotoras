import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject, map } from 'rxjs';
import Swal from 'sweetalert2';
import { CatalogoCil, Cil } from '../mainPage/interfaces/catalogos-cil';
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

     this._catalogServices.getDataCil('cil').subscribe()
  }

  
  // catalogo cil



  /*public get datos() : Cil[] {
    return [...this.data]
  }*/
  
 /* private subject = new BehaviorSubject(this.data)
  catalogos: Observable<Cil[]> = this.subject.asObservable()

  public actulizarVariable( nuevoValor : Cil[]) : void {
   this.subject.next(nuevoValor)
  }*/
}
