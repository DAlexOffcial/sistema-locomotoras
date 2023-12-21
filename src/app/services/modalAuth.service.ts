import { Injectable, OnDestroy } from '@angular/core';
import { OperarioService } from './Operario.service';
import * as jwt_decode from 'jwt-decode';
import { TokenData } from '../interfaces/login';
import Swal from 'sweetalert2';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';
import { Usuario } from '../mainPage/interfaces/usuarios';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ModalAuthService {
  private token!: TokenData
  public timeoutId: any;
  constructor(private _operarioService: OperarioService, private _loginService: LoginService, private http: HttpClient, private router: Router) {
  }
  checkTokenExpiration() {
    // Cancelar cualquier temporizador existente antes de configurar uno nuevo
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.token = jwt_decode.jwtDecode((localStorage.getItem('token') ?? ''))
    if (this.token) {
      const currentTime = Math.floor(Date.now() / 1000) + 10  
      const expirationTime = this.token.exp;
      const timeRemaining = expirationTime - currentTime;
      if (timeRemaining <= 1800 && timeRemaining > 0 || timeRemaining <= 0) {  // Menos de 30 minutos y mayor que cero
        this.timeoutId = setTimeout(() => {
          if (window.location.pathname !== '/login') {
            this.showTokenExpirationModal();
          }
        }, timeRemaining * 1000);
      }
    }
  }
  private showTokenExpirationModal() {  
    Swal.fire({
      title: "¿Quieres volver a iniciar sesión?",
      icon: "question",
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonText: "Reingresar",
      confirmButtonColor: "#455560",
      timer: 10000
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        this.router.navigate(['/login']);
      } else if (result.isConfirmed) {
        this.Relogin()
      }
    });
  }
  /*
    preConfirm: () => {
        this.Relogin()
      },
    })
    this.tempo = setTimeout(() => {
      this.router.navigate(['/login']);
      Swal.close();
    }, 10000);
  */


  private Relogin() {
    const NoEmpleado: number = this._operarioService.decrypt((localStorage.getItem('NoEmpleado') ?? ''))
    this.getDataCatalogos(NoEmpleado).subscribe(data => {
      this._loginService.postDatos(NoEmpleado, data.Password).subscribe(data => {
        localStorage.removeItem('token')
        localStorage.setItem('token', data.token)
        this.checkTokenExpiration()
      })
    })
  }
  getDataCatalogos(NoEmpleado: number): Observable<Usuario> {
    const apiUrl = `/api/profile?id=${NoEmpleado}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this.http.get<Usuario>(apiUrl, { headers })
  }
}
