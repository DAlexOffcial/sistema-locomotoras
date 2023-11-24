import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CatalogosService } from '../../services/catalogos.service';
import { Mantenedore } from '../../interfaces/catalogos-cil';

@Component({
  selector: 'app-catalogo-mantenedores',
  templateUrl: './catalogo-mantenedores.component.html',
  styleUrls: ['./catalogo-mantenedores.component.css']
})
export class CatalogoMantenedoresComponent implements AfterViewInit{
    
  displayedColumns : string[] = ['id_mantenedor', 'desc_mantenedor', 'activo', 'fecha_registro', 'fecha_actualizacion','acciones']

  dataSource = new MatTableDataSource<any>();

  catalogoData: Mantenedore[] = []

  @ViewChild(MatPaginator, {static :true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (private _catalogoServices: CatalogosService){
     _catalogoServices.getDataCatalogos('mantenedores').subscribe(data =>{
      this.catalogoData = data.Catalog.mantenedores
      this.dataSource.data = this.catalogoData
      console.log(this.catalogoData)
     })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Mantenedores por pagina: '
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
