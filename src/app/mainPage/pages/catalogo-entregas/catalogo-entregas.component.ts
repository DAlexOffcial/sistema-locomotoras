import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CatalogosService } from '../../services/catalogos.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Entregas } from '../../interfaces/catalogos-cil';

@Component({
  selector: 'app-catalogo-entregas',
  templateUrl: './catalogo-entregas.component.html',
  styleUrls: ['./catalogo-entregas.component.css']
})
export class CatalogoEntregasComponent implements AfterViewInit{
   
  displayedColumns : string[] = ['id_tipo_entrega', 'desc_tipo_entrega', 'activo', 'fecha_registro' , 'fecha_actualizacion' ,'acciones']

  dataSource = new MatTableDataSource<any>();

  catalogoData: Entregas [] = []

  @ViewChild(MatPaginator, {static :true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (private _catalogoServices: CatalogosService){
     _catalogoServices.getDataCatalogos('entregas').subscribe(data =>{
      this.catalogoData = data.Catalog.entregas
      this.dataSource.data = this.catalogoData
      console.log(this.catalogoData)
     })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Entregas por pagina: '
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
