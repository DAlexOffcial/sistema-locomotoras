import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CatalogosService } from '../../services/catalogos.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Acciones, Inspecciones } from '../../interfaces/catalogos';
import Swal from 'sweetalert2';
import { HabilitarService } from '../../services/edit.service';
import { Subscription } from 'rxjs';
import { TablasService } from '../../services/Tablas.service';
import { ModalAuthService } from 'src/app/services/modalAuth.service';
@Component({
  selector: 'app-catalogo-inspecciones',
  templateUrl: './catalogo-inspecciones.component.html',
  styleUrls: ['./catalogo-inspecciones.component.css']
})
export class CatalogoInspeccionesComponent implements AfterViewInit , OnInit{
  displayedColumns : string[] = ['acciones', 'tipo_inspeccion', 'desc_tipo_inspeccion' , 'tiempo_meta' , 'activo' , 'fecha_registro' , 'fecha_actualizacion'];
  private subscription: Subscription = new Subscription();
  dataSource = new MatTableDataSource<Inspecciones>();

  @ViewChild(MatPaginator, {static :true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor (private _catalogoServices: CatalogosService, private _habilitarServices:HabilitarService , private _tablasServices : TablasService , private _modalAuthService : ModalAuthService){
    this.cargarTabla()
  }
  ngOnInit(): void {
    this._modalAuthService.checkTokenExpiration()
    this.subscription = this._tablasServices.obserbableTabla('inspecciones').subscribe(() => {
      this.cargarTabla()
    } )
  }
  cargarTabla(){
    this._catalogoServices.getDataCatalogos('inspecciones').subscribe(data =>{
      this.dataSource.data = data
     })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Inspecciones por pagina: '
    this.dataSource.sort = this.sort
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  nuevaIspeccion: Inspecciones = {
    id_tipo_inspeccion: 0,
    tipo_inspeccion: '',
    desc_tipo_inspeccion: '',
    tiempo_meta: 0,
    activo: '',
    fecha_registro: '',
    fecha_actualizacion: ''
  };
  //modals
  openEditDialog(element : Inspecciones, TipoBoton : string): void {
    this._habilitarServices.openEditDialog('inspecciones', element , TipoBoton)
  }
    //cambio de estatus
    cambiarEstatus(acciones : Inspecciones , estatus : string): void {
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
          const catalogo = 'inspecciones'
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
