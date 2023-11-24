import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CatalogosService } from '../../services/catalogos.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Inspecciones } from '../../interfaces/catalogos-cil';

@Component({
  selector: 'app-catalogo-inspecciones',
  templateUrl: './catalogo-inspecciones.component.html',
  styleUrls: ['./catalogo-inspecciones.component.css']
})
export class CatalogoInspeccionesComponent implements AfterViewInit{
 
 
  displayedColumns : string[] = ['id_tipo_inspeccion', 'tipo_inspeccion', 'desc_tipo_inspeccion' , 'tiempo_meta' , 'activo' , 'fecha_registro' , 'fecha_actualizacion' , 'acciones'];

  dataSource = new MatTableDataSource<any>();

  catalogoData: Inspecciones[] = []

  @ViewChild(MatPaginator, {static :true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (private _catalogoServices: CatalogosService){
     _catalogoServices.getDataCatalogos('inspecciones').subscribe(data =>{
      this.catalogoData = data.Catalog.inspecciones
      this.dataSource.data = this.catalogoData
      console.log(this.catalogoData)
     })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Inspecciones por pagina: '
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
