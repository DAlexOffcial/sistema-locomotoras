import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CatalogosService } from '../../services/catalogos.service';
import { LoginService } from 'src/app/services/login.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Cil } from '../../interfaces/catalogos-cil';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { HabilitarService } from '../../services/Habilitar.service';

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

  constructor (private _catalogoServices: CatalogosService , private _habilitarServices: HabilitarService){
    this.cargarTabla()
  }
  
  cargarTabla(){
    this._catalogoServices.getDataCatalogos('cil').subscribe(data =>{
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

  //modals
  openEditDialog(elements: Cil ): void {
    console.log(elements.id_cil)
    this._habilitarServices.openEditDialog('cil' , elements)
  }

  openDialogCil(): void{
     this._habilitarServices.openAddDialog()
  }

    //cambio de estatus
    cambiarEstatus(acciones : Cil , estatus : string): void {
      console.log(acciones.id_cil)
      Swal.fire({
        title: (acciones.activo === '1') ? "¿Quieres habilitar este Cil?" : "¿Quieres desahabilitar este Cil?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        text: (acciones.activo === '1') ? `Se habilitara : ${acciones.id_cil}` : `Se desahabilitara : ${acciones.id_cil}`,
        confirmButtonText: (acciones.activo === '1') ? "habilitar" : "desahabilitar",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title:(acciones.activo === '1') ? "Tu Cil esta habilitado" : "Tu Cil esta desahabilitado",
            icon: "success"
          });
          //va al servicio
          acciones.activo = estatus
          const catalogo = 'cil'
          this._habilitarServices.cambiarEstatus(catalogo , acciones).subscribe(res => {
            console.log(JSON.stringify(res));
            this.cargarTabla()
          },(error) => {
            console.log(error)
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: 'Hubo un error con tu servidor',
            });
          })
        }
      });
    }
  

}
