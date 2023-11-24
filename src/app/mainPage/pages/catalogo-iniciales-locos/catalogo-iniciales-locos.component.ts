import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CatalogosService } from '../../services/catalogos.service';
import { MatTableDataSource } from '@angular/material/table';
import { InicialesLoco } from '../../interfaces/catalogos-cil';

@Component({
  selector: 'app-catalogo-iniciales-locos',
  templateUrl: './catalogo-iniciales-locos.component.html',
  styleUrls: ['./catalogo-iniciales-locos.component.css']
})
export class CatalogoInicialesLocosComponent implements AfterViewInit{
  
  displayedColumns : string[] = ['id_inicial_loco', 'desc_inicial_loco', 'activo', 'fecha_registro', 'fecha_actualizacion','acciones']

  dataSource = new MatTableDataSource<any>();

  catalogoData: InicialesLoco[] = []

  @ViewChild(MatPaginator, {static :true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (private _catalogoServices: CatalogosService){
     _catalogoServices.getDataCatalogos('iniciales_locos').subscribe(data =>{
      this.catalogoData = data.Catalog.iniciales_locos
      this.dataSource.data = this.catalogoData
      console.log(this.catalogoData)
     })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Locomotoras externas por pagina: '
    this.dataSource.sort = this.sort
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialogCil(): void{
     this._catalogoServices.openAddDialog()
  }
}
