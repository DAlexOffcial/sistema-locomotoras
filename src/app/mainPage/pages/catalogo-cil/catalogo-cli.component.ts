import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CatalogosService } from '../../services/catalogos.service';

@Component({
  selector: 'app-catalogo-cli',
  templateUrl: './catalogo-cli.component.html',
  styleUrls: ['./catalogo-cli.component.css']
})
export class CatalogoCliComponent implements OnInit{
  constructor (private _catalogoServices: CatalogosService){}
  
  ngOnInit(): void {
    this._catalogoServices.getCatlogo('cil')
  }

 /* openDialogCil(): void{
     this._catalogoServices.openAddDialog()
  }*/
}
