import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CatalogosService } from '../../services/catalogos.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Entregas } from '../../interfaces/catalogos';
import Swal from 'sweetalert2';
import { HabilitarService } from '../../services/edit.service';
import { Subscription } from 'rxjs';
import { TablasService } from '../../services/Tablas.service';
import { ModalAuthService } from 'src/app/services/modalAuth.service';
@Component({
  selector: 'app-catalogo-entregas',
  templateUrl: './catalogo-entregas.component.html',
  styleUrls: ['./catalogo-entregas.component.css']
})
export class CatalogoEntregasComponent implements AfterViewInit , OnInit{
  private subscription: Subscription = new Subscription();
  displayedColumns : string[] = ['acciones', 'desc_tipo_entrega', 'activo', 'fecha_registro' , 'fecha_actualizacion']
  dataSource = new MatTableDataSource<Entregas>();

  @ViewChild(MatPaginator, {static :true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor (private _catalogoServices: CatalogosService ,  private _habilitarServices:HabilitarService , private _tablasServices : TablasService, private _modalAuthService:ModalAuthService){
     this.cargarTabla()
  }
  ngOnInit(): void {
    this._modalAuthService.checkTokenExpiration()
    this.subscription = this._tablasServices.obserbableTabla('entregas').subscribe(() => {
      this.cargarTabla()
    } )
  }
  cargarTabla(){
    this._catalogoServices.getDataCatalogos('entregas').subscribe(data =>{
      this.dataSource.data = data
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
  nuevaEntrega: Entregas = {
    id_tipo_entrega: 0,
    desc_tipo_entrega: '',
    activo: '',
    fecha_registro: '',
    fecha_actualizacion: ''
  };
  //modals
  openEditDialog(element : Entregas , TipoBoton :  string): void {
    this._habilitarServices.openEditDialog('entregas', element , TipoBoton)
  }
    //cambio de estatus
    cambiarEstatus(acciones : Entregas , estatus : string): void {
      Swal.fire({
        title: (acciones.activo === '0') ? "¿quieres habilitar esta accion?" : "¿quieres desahabilitar esta accion?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: (acciones.activo === '0') ? "habilitar" : "desahabilitar",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title:(acciones.activo === '0') ? "tu accion esta habilitada" : "tu accion esta desahabilitada",
            icon: "success"
          });
          //va al servicio
          acciones.activo = estatus
          const catalogo = 'entregas'
          this._habilitarServices.cambiarEstatus(catalogo , acciones).subscribe(res => {
            this.cargarTabla()
          },(error) => {
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
