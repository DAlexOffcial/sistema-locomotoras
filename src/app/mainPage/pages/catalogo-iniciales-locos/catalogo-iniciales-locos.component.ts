import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CatalogosService } from '../../services/catalogos.service';
import { MatTableDataSource } from '@angular/material/table';
import { InicialesLoco } from '../../interfaces/catalogos';
import Swal from 'sweetalert2';
import { HabilitarService } from '../../services/Habilitar.service';

@Component({
  selector: 'app-catalogo-iniciales-locos',
  templateUrl: './catalogo-iniciales-locos.component.html',
  styleUrls: ['./catalogo-iniciales-locos.component.css']
})
export class CatalogoInicialesLocosComponent implements AfterViewInit{
  
  displayedColumns : string[] = ['acciones', 'desc_inicial_loco', 'activo', 'fecha_registro', 'fecha_actualizacion']

  dataSource = new MatTableDataSource<any>();

  catalogoData: InicialesLoco[] = []

  @ViewChild(MatPaginator, {static :true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (private _catalogoServices: CatalogosService ,  private _habilitarServices: HabilitarService){
    this.cargarTabla()
  }

  cargarTabla(){
    this._catalogoServices.getDataCatalogos('iniciales_locos').subscribe(data =>{
      this.catalogoData = data.Catalog.iniciales_locos
      this.dataSource.data = this.catalogoData
      console.log(this.catalogoData)
     })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Locomotoras externas por pagina: '
    this.dataSource.sort = this.sort
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //modals
  openEditDialog(element : InicialesLoco , TipoBoton: string): void {
    this._habilitarServices.openEditDialog('iniciales_locos', element , TipoBoton )
  }

  openDialogCil(): void{
     this._habilitarServices.openAddDialog()
  }

  
  //cambio de estatus
  cambiarEstatus(acciones : InicialesLoco , estatus : string): void {
    console.log(acciones.id_inicial_loco)
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
        const catalogo = 'iniciales_locos'
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
