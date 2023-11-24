import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CatalogosService } from '../../services/catalogos.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Banio } from '../../interfaces/catalogos-cil';

@Component({
  selector: 'app-catalogo-banios',
  templateUrl: './catalogo-banios.component.html',
  styleUrls: ['./catalogo-banios.component.css']
})
export class CatalogoBaniosComponent implements AfterViewInit{
  
  displayedColumns : string[] = ['id_banio', 'desc_banio', 'activo' , 'fecha_registro' , 'fecha_actualizacion','acciones']

  dataSource = new MatTableDataSource<any>();

  catalogoData: Banio[] = []

  @ViewChild(MatPaginator, {static :true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (private _catalogoServices: CatalogosService){
     _catalogoServices.getDataCatalogos('banios').subscribe(data =>{
      this.catalogoData = data.Catalog.banios
      this.dataSource.data = this.catalogoData
      console.log(this.catalogoData)
     })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Baños por pagina: '
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
