import { Component } from '@angular/core';
import { CatalogosService } from '../../services/catalogos.service';

@Component({
  selector: 'app-catalogo-entregas',
  templateUrl: './catalogo-entregas.component.html',
  styleUrls: ['./catalogo-entregas.component.css']
})
export class CatalogoEntregasComponent {
   
  constructor (private _catalogoServices: CatalogosService){}
  ngOnInit(): void {
    this._catalogoServices.getCatlogo('entregas')
  }
}
