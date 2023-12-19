import { Pipe, PipeTransform } from '@angular/core';
import { CatalogosService } from './services/catalogos.service';
import { Funcione } from './interfaces/catalogos';

@Pipe({
    name: 'roles'
})
export class FormatoRolesPipe implements PipeTransform {

    funciones: Funcione[] = [];
    dataLoaded: Promise<boolean>;
  
    constructor(private _catalogoServices: CatalogosService) {
      this.dataLoaded = new Promise<boolean>((resolve) => {
        _catalogoServices.getDataCatalogos('funciones').subscribe(data => {
          this.funciones = data.Catalog.funciones;
          resolve(true);
        });
      });
    }
  
    transform(opcion: number): Promise<string> {
      return this.dataLoaded.then(() => {
        const funcion = this.funciones.find(item => item.id_funcion === opcion);
  
        if (funcion) {
          return funcion.desc_funcion; // Usa la propiedad desc_funcion
        } else {
          return 'Opción no válida';
        }
      });
    }
  }
