import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CatalogosService } from '../../services/catalogos.service';
import { Locomotora } from '../../interfaces/catalogos';
import Swal from 'sweetalert2';
import { HabilitarService } from '../../services/Habilitar.service';

@Component({
  selector: 'app-catalogo-locomotoras',
  templateUrl: './catalogo-locomotoras.component.html',
  styleUrls: ['./catalogo-locomotoras.component.css']
})
export class CatalogoLocomotorasComponent implements AfterViewInit{
   
  displayedColumns : string[] = ['acciones', 'desc_loco', 'fk_mantenedor', 'activo' , 'fecha_registro', 'fecha_actualizacion']

  dataSource = new MatTableDataSource<any>();

  catalogoData: Locomotora[] = []

  @ViewChild(MatPaginator, {static :true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (private _catalogoServices: CatalogosService, private _habilitarServices: HabilitarService){
    this.cargarTabla()
  }
 
  cargarTabla(){
    this._catalogoServices.getDataCatalogos('locomotoras').subscribe(data =>{
      this.catalogoData = data.Catalog.locomotoras
      this.dataSource.data = this.catalogoData
      console.log(this.catalogoData)
     })
  }
   
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Locomotoras por pagina: '
    this.dataSource.sort = this.sort
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openEditDialog(element: Locomotora , TipoBoton : string): void {
    this._habilitarServices.openEditDialog('locomotoras' , element , TipoBoton)
  }

  openDialogCil(): void{
     this._habilitarServices.openAddDialog()
  }
 
   //cambio de estatus
   cambiarEstatus(acciones : Locomotora , estatus : string): void {
    console.log(acciones.id_loco)
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
        const catalogo = 'locomotoras'
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
