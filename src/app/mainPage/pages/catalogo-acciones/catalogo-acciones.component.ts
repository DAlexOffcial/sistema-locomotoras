import { Component } from '@angular/core';
import { CatalogosService } from '../../services/catalogos.service';

@Component({
  selector: 'app-catalogo-acciones',
  templateUrl: './catalogo-acciones.component.html',
  styleUrls: ['./catalogo-acciones.component.css']
})
export class CatalogoAccionesComponent {
  constructor (private _catalogoServices: CatalogosService){}
  ngOnInit(): void {
    this._catalogoServices.getCatlogo('acciones')
  }
}
