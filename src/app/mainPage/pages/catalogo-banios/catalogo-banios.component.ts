import { Component } from '@angular/core';
import { CatalogosService } from '../../services/catalogos.service';

@Component({
  selector: 'app-catalogo-banios',
  templateUrl: './catalogo-banios.component.html',
  styleUrls: ['./catalogo-banios.component.css']
})
export class CatalogoBaniosComponent {
  
  constructor (private _catalogoServices: CatalogosService){}
  ngOnInit(): void {
    this._catalogoServices.getCatlogo('banios')
  }
}
