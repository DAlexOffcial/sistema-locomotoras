import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CatalogosService } from '../../services/catalogos.service';
import { LoginService } from 'src/app/services/login.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Cil } from '../../interfaces/catalogos-cil';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-catalogo-cli',
  templateUrl: './catalogo-cli.component.html',
  styleUrls: ['./catalogo-cli.component.css']
})
export class CatalogoCliComponent implements AfterViewInit{

  displayedColumns : string[] = ['id_cil', 'desc_cil', 'activo', 'fecha_registro', 'fecha_actualizacion', 'PUESTO_TRABAJO' ,'acciones']

  dataSource = new MatTableDataSource<any>();

  catalogoData: Cil[] = []

  @ViewChild(MatPaginator, {static :true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (private _catalogoServices: CatalogosService){
     _catalogoServices.getDataCatalogos('cil').subscribe(data =>{
      this.catalogoData = data.Catalog.cil
      this.dataSource.data = this.catalogoData
      console.log(this.catalogoData)
     })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Cil por pagina: '
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
