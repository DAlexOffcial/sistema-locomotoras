import { AfterViewInit, Component, OnInit, Output, ViewChild } from '@angular/core';
import { CatalogosService } from '../../services/catalogos.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'tabla-main-page',
  templateUrl: './tabla-main-page.component.html',
  styleUrls: ['./tabla-main-page.component.css']
})
export class TablaMainPageComponent implements OnInit , AfterViewInit{

  @Output() mensaje
   
  dataSource = new MatTableDataSource<any>();
  
  tipoCatalogo: string = ''

  catalogoData: any[] = []

  displayedColumns : string[] = []
   
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | null = null;

  constructor(private _catalogosServices : CatalogosService) {}

  ngOnInit(): void {
  
    this.tipoCatalogo = 'inspecciones';
    this.configurarColumnas();
    console.log(this.displayedColumns)
    this._catalogosServices.getDataCil(this.tipoCatalogo).subscribe(data => {
      this.catalogoData = data.Catalog[this.tipoCatalogo];
      console.log(this.catalogoData)   
      this.dataSource.data = this.catalogoData
    });
  }

  ngAfterViewInit(): void {

  }

  public configurarColumnas(): void {
    switch (this.tipoCatalogo) {
      case 'cil':
        this.displayedColumns = ['id_cil', 'desc_cil', 'activo', 'fecha_registro', 'fecha_actualizacion', 'PUESTO_TRABAJO'];
        break;
      case 'inspecciones':
        this.displayedColumns = ['id_tipo_inspeccion', 'tipo_inspeccion', 'desc_tipo_inspeccion' , 'tiempo_meta' , 'activo' , 'fecha_registro' , 'fecha_actualizacion'];
        break;
      case 'entregas':
        this.displayedColumns = ['id_tipo_entrega', 'desc_tipo_entrega', ];
        break;
      case 'acciones':
        this.displayedColumns = ['id_accion', 'desc_accion',];
        break;
      case 'banios':
        this.displayedColumns = ['id_banio', 'desc_banio', ];
        break;
      default:
        throw new Error(`Tipo de catálogo no válido: ${this.tipoCatalogo}`);
    }
  }

}
