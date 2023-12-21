import { Pipe, PipeTransform } from '@angular/core';
import { CatalogosService } from './services/catalogos.service';
import { Mantenedore } from './interfaces/catalogos';

@Pipe({
    name: 'fk_mantenedores'
})
export class FormatoFK_mantenedoresPipe implements PipeTransform {

  mantenedores: Mantenedore[] = [];
  dataLoaded: Promise<boolean>;

  constructor(private _catalogosService: CatalogosService) {
    this.dataLoaded = new Promise<boolean>((resolve) => {
      _catalogosService.getDataCatalogos('mantenedores').subscribe(data => {
        this.mantenedores = data;
        resolve(true);
      });
    });
  }

  async transform(opcion: number): Promise<string> {
    return this.dataLoaded.then(() => {
      const mantenedor = this.mantenedores.find(item => item.id_mantenedor === opcion);

      if (mantenedor) {
        return mantenedor.desc_mantenedor;
      } else {
        return 'Opción no válida';
      }
    });
  }
}
