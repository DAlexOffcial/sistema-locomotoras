import { Component, OnInit, ViewChild } from '@angular/core';
import { Cil } from '../../interfaces/catalogos-cil';
import { CatalogosService } from '../../services/catalogos.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-catalogo-cli',
  templateUrl: './catalogo-cli.component.html',
  styleUrls: ['./catalogo-cli.component.css']
})
export class CatalogoCliComponent implements OnInit {
  dataSource = new MatTableDataSource<Cil>();

  CatalogoCLI: Cil[] = []
 
  constructor(private _catalogosServices: CatalogosService) {}

  displayedColumns: string[] = ['id_cil', 'desc_cil', 'activo', 'fecha_registro', 'fecha_actualizacion', 'PUESTO_TRABAJO'];
 
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | null = null;

  ngOnInit(): void {
    this._catalogosServices.getDataCil('cil').subscribe(data => {
      this.CatalogoCLI = data.Catalog.cil
      console.log(this.CatalogoCLI)

      this.dataSource.data = data.Catalog.cil
      this.dataSource.paginator = this.paginator


      // .filter((cil: Cil) => cil.activo === '1')
    })
  }


  /*showData(){
    console.log('estoy funcionando')
    this._catalogosServices.getDataCatalogCil().subscribe(data => {
      this.CatalogoCLI = data
      console.log(thiss.CatalogoCLI)
    })
  }*/
 

  /*showData(){
      this.CatalogoCLI = this._catalogosServices.data
      console.log(JSON.stringify(this._catalogosServices.data))
  }*/

}
