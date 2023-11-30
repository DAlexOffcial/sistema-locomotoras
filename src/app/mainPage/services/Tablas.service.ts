import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TriggerPayload } from '../interfaces/TriggerPayload';
import { filter } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TablasService {

  constructor() { }

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
