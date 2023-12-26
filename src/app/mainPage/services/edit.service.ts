import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { EditCilComponent } from '../components/edit-forms-modals/edit-cil/edit-cil.component';
import { EditInspeccionesComponent } from '../components/edit-forms-modals/edit-inspecciones/edit-inspecciones.component';
import { EditAccionesComponent } from '../components/edit-forms-modals/edit-acciones/edit-acciones.component';
import { EditBaniosComponent } from '../components/edit-forms-modals/edit-banios/edit-banios.component';
import { EditEmpleadosComponent } from '../components/edit-forms-modals/edit-empleados/edit-empleados.component';
import { EditInicialesLocosComponent } from '../components/edit-forms-modals/edit-iniciales-locos/edit-iniciales-locos.component';
import { EditLocomotorasComponent } from '../components/edit-forms-modals/edit-locomotoras/edit-locomotoras.component';
import { EditMantenedoresComponent } from '../components/edit-forms-modals/edit-mantenedores/edit-mantenedores.component';
import { EditEntregasComponent } from '../components/edit-forms-modals/edit-entregas/edit-entregas.component';
import { AddCilComponent } from '../components/edit-forms-modals/add-cil/add-cil.component';
import { AddEmpleadosComponent } from '../components/edit-forms-modals/add-empleados/add-empleados.component';
import { PasswordEmpleadosComponent } from '../components/edit-forms-modals/password-empleados/password-empleados.component';

import { Cil, Empleado } from '../interfaces/catalogos';
import { BehaviorSubject, Observable} from 'rxjs';
import { filter } from 'rxjs/operators'
import { TriggerPayload } from '../interfaces/TriggerPayload';


@Injectable({
  providedIn: 'root'
})
export class HabilitarService {

  constructor(private http: HttpClient, private matDialog: MatDialog) { }
  
  //modals
  openAddDialogCil( element: Cil , TipoBoton: string){
    this.matDialog.open(AddCilComponent, {
      width: '50%',
      height: 'auto',
      position: { top: '10%' } ,
      data: { element: element , TipoBoton : TipoBoton }
    })
  }

  openAddDialogEmpleado( element: Empleado , TipoBoton: string){
    this.matDialog.open(AddEmpleadosComponent, {
      width: '50%',
      height: 'auto',
      position: { top: '10%' } ,
      data: { element: element , TipoBoton : TipoBoton }
    })
  }

  openPasswordDialogEmpleado( element: Empleado , TipoBoton: string){
    this.matDialog.open(PasswordEmpleadosComponent, {
      width: '50%',
      height: 'auto',
      position: { top: '10%' } ,
      data: { element: element , TipoBoton : TipoBoton }
    })
  }

  openEditDialog(catalogo: string , element: any , TipoBoton: string): void {
    switch (catalogo) {
      case 'cil':
        this.matDialog.open(EditCilComponent, {
          width: '50%',
          height: 'auto',
          position: { top: '10%' } ,
          data: { element: element , TipoBoton : TipoBoton }
        })
        break;
      case 'inspecciones':
        this.matDialog.open(EditInspeccionesComponent, {
          width: '50%',
          height: 'auto',
          position: { top: '10%' } ,
          data: {element : element , TipoBoton : TipoBoton}
        })
        break;
      case 'entregas':
        this.matDialog.open(EditEntregasComponent, {
          width: '50%',
          height: 'auto',
          position: { top: '10%' } ,
          data: {element : element , TipoBoton : TipoBoton}
        })
        break;
      case 'acciones':
        this.matDialog.open(EditAccionesComponent, {
          width: '50%',
          height: 'auto',
          position: { top: '10%' } ,
          data: {element: element , TipoBoton : TipoBoton}
        })
        break;
      case 'banios':
        this.matDialog.open(EditBaniosComponent, {
          width: '50%',
          height: 'auto',
          position: { top: '10%' } ,
          data: {element: element , TipoBoton : TipoBoton}
        })
        break;
      case 'empleados':
        this.matDialog.open(EditEmpleadosComponent, {
          width: '50%',
          height: 'auto',
          position: { top: '10%' } ,    
          data: {element: element , TipoBoton : TipoBoton}      
        })
        break;
      case 'iniciales_locos':
        this.matDialog.open(EditInicialesLocosComponent, {
          width: '50%',
          height: 'auto',
          position: { top: '10%' } ,
          data: {element: element , TipoBoton : TipoBoton}
        })
        break;
      case 'locomotoras':
        this.matDialog.open(EditLocomotorasComponent, {
          width: '50%',
          height: 'auto',
          position: { top: '10%' } ,
          data: {element: element , TipoBoton : TipoBoton}
        })
        break;
      case 'mantenedores':
        this.matDialog.open(EditMantenedoresComponent, {
          width: '50%',
          height: 'auto',
          position: { top: '7%' } ,
          data: {element: element , TipoBoton : TipoBoton}
        })
        break;
      default:
        throw new Error(`Tipo de catálogo no válido: ${catalogo}`);
    }

  }

  //recargar tablas 
  private tablaSubject = new BehaviorSubject<TriggerPayload | null>(null);

  TriggerTabla(OrigenTabla: string){
    this.tablaSubject.next({OrigenTabla})
  }
  
  obserbableTabla(OrigenTabla : string) : Observable<TriggerPayload | null > {
    return this.tablaSubject.asObservable().pipe(
     filter((payload) => payload !== null && payload.OrigenTabla === OrigenTabla)
    )
  }
}
