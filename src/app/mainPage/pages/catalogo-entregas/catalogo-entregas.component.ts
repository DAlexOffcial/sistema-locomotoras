import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CatalogosService } from '../../services/catalogos.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Entregas } from '../../interfaces/catalogos-cil';
import Swal from 'sweetalert2';
import { HabilitarService } from '../../services/Habilitar.service';

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

  constructor (private _catalogoServices: CatalogosService ,  private _habilitarServices:HabilitarService){
     this.cargarTabla()
  }

  cargarTabla(){
    this._catalogoServices.getDataCatalogos('entregas').subscribe(data =>{
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
  
  //modals
  openEditDialog(element : Entregas): void {
    this._habilitarServices.openEditDialog('entregas',element)
  }

  openDialogCil(): void{
     this._habilitarServices.openAddDialog()
  }

    //cambio de estatus
    cambiarEstatus(acciones : Entregas , estatus : string): void {
      console.log(acciones.id_tipo_entrega)
      Swal.fire({
        title: (acciones.activo === '1') ? "¿quieres habilitar esta accion?" : "¿quieres desahabilitar esta accion?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: (acciones.activo === '1') ? "habilitar" : "desahabilitar",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title:(acciones.activo === '1') ? "tu accion esta habilitar" : "tu accion esta desahabilitar",
            text: "Your file has been deleted.",
            icon: "success"
          });
          //va al servicio
          acciones.activo = estatus
          const catalogo = 'entregas'
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
