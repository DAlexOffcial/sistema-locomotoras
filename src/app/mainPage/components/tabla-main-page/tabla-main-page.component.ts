import { AfterViewInit, Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CatalogosService } from '../../services/catalogos.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'tabla-main-page',
  templateUrl: './tabla-main-page.component.html',
  styleUrls: ['./tabla-main-page.component.css']
})
export class TablaMainPageComponent {

  /*dataSource = new MatTableDataSource<any>();

  catalogoData: any[] = []

  tipoCatalogo: string = ''

  displayedColumns : string[] = []

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _catalogosServices : CatalogosService) {
    this._catalogosServices.setCatalogo().subscribe(tipoCatalogo => {
      this.tipoCatalogo = tipoCatalogo
      console.log(this.tipoCatalogo)
    })
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    
    this.configurarColumnas();

    this._catalogosServices.getDataCatalogos(this.tipoCatalogo).subscribe(data => {
      this.catalogoData = data.Catalog[this.tipoCatalogo];
      console.log(this.catalogoData)   
      this.dataSource.data = this.catalogoData
      
    });
    this.dataSource.paginator = this.paginator
    console.log(this.paginator)
  }

  public configurarColumnas(): void {
    
    const columnaAdicional = 'columna_adicional';

    switch (this.tipoCatalogo) {
      case 'cil':
        this.displayedColumns = ['id_cil', 'desc_cil', 'activo', 'fecha_registro', 'fecha_actualizacion', 'PUESTO_TRABAJO'];
        this.dataSource.paginator = this.paginator
        break;
      case 'inspecciones':
        this.displayedColumns = ['id_tipo_inspeccion', 'tipo_inspeccion', 'desc_tipo_inspeccion' , 'tiempo_meta' , 'activo' , 'fecha_registro' , 'fecha_actualizacion'];
        break;
      case 'entregas':
        this.displayedColumns = ['id_tipo_entrega', 'desc_tipo_entrega', 'activo', 'fecha_registro' , 'fecha_actualizacion'];
        break;
      case 'acciones':
        this.displayedColumns = ['id_accion', 'desc_accion', 'activo' , 'fecha_registro' , 'fecha_actualizacion'];
        break;
      case 'banios':
        this.displayedColumns = ['id_banio', 'desc_banio', 'activo' , 'fecha_registro' , 'fecha_actualizacion'];
        break;
      default:
        throw new Error(`Tipo de catálogo no válido: ${this.tipoCatalogo}`);
    }
    
  }*/
}
