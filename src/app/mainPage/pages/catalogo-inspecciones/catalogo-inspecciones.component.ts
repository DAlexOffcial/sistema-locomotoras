import { Component } from '@angular/core';
import { CatalogosService } from '../../services/catalogos.service';

@Component({
  selector: 'app-catalogo-inspecciones',
  templateUrl: './catalogo-inspecciones.component.html',
  styleUrls: ['./catalogo-inspecciones.component.css']
})
export class CatalogoInspeccionesComponent {
 
  constructor (private _catalogoServices: CatalogosService){}
  ngOnInit(): void {
    this._catalogoServices.getCatlogo('inspecciones')
  }
}
