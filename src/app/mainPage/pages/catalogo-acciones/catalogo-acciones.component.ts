import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CatalogosService } from '../../services/catalogos.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Acciones } from '../../interfaces/catalogos-cil';

@Component({
  selector: 'app-catalogo-acciones',
  templateUrl: './catalogo-acciones.component.html',
  styleUrls: ['./catalogo-acciones.component.css']
})
export class CatalogoAccionesComponent implements AfterViewInit {
  displayedColumns : string[] = ['id_accion', 'desc_accion', 'activo' , 'fecha_registro' , 'fecha_actualizacion','acciones']

  dataSource = new MatTableDataSource<any>();

  catalogoData: Acciones[] = []

  @ViewChild(MatPaginator, {static :true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (private _catalogoServices: CatalogosService){
     _catalogoServices.getDataCatalogos('acciones').subscribe(data =>{
      this.catalogoData = data.Catalog.acciones
      this.dataSource.data = this.catalogoData
      console.log(this.catalogoData)
     })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Acciones por pagina: '
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
