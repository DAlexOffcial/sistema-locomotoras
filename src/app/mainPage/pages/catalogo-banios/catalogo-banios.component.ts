import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CatalogosService } from '../../services/catalogos.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Banio } from '../../interfaces/catalogos-cil';
import Swal from 'sweetalert2';
import { HabilitarService } from '../../services/Habilitar.service';

@Component({
  selector: 'app-catalogo-banios',
  templateUrl: './catalogo-banios.component.html',
  styleUrls: ['./catalogo-banios.component.css']
})
export class CatalogoBaniosComponent implements AfterViewInit{
  
  displayedColumns : string[] = [ 'acciones' ,'desc_banio', 'activo' , 'fecha_registro' , 'fecha_actualizacion']

  dataSource = new MatTableDataSource<any>();

  catalogoData: Banio[] = []

  @ViewChild(MatPaginator, {static :true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (private _catalogoServices: CatalogosService ,  private _habilitarServices: HabilitarService){
    this.cargarTabla()
  }

  cargarTabla():void{
    this._catalogoServices.getDataCatalogos('banios').subscribe(data =>{
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

  //modals
  openDialogCil(): void{
     this._habilitarServices.openAddDialog()
  }
  openEditDialog(element : Banio): void {
    this._habilitarServices.openEditDialog('banios' , element)
  }


  //cambio de estatus
  cambiarEstatus(acciones : Banio , estatus : string): void {
    console.log(acciones.id_banio)
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
        const catalogo = 'banios'
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
