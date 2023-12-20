import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CatalogosService } from '../../services/catalogos.service';
import { Locomotora } from '../../interfaces/catalogos';
import Swal from 'sweetalert2';
import { HabilitarService } from '../../services/edit.service';
import { Subscription } from 'rxjs';
import { TablasService } from '../../services/Tablas.service';
import { ModalAuthService } from 'src/app/services/modalAuth.service';
@Component({
  selector: 'app-catalogo-locomotoras',
  templateUrl: './catalogo-locomotoras.component.html',
  styleUrls: ['./catalogo-locomotoras.component.css']
})
export class CatalogoLocomotorasComponent implements AfterViewInit , OnInit{
  private subscription: Subscription = new Subscription();
  displayedColumns : string[] = ['acciones', 'desc_loco', 'fk_mantenedor', 'activo' , 'fecha_registro', 'fecha_actualizacion']
  dataSource = new MatTableDataSource<any>();
  catalogoData: Locomotora[] = []
  @ViewChild(MatPaginator, {static :true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor (private _catalogoServices: CatalogosService, private _habilitarServices: HabilitarService , private _tablasServices : TablasService , private _modalAuthService: ModalAuthService){
    this.cargarTabla()
  }
  ngOnInit(): void {
    this._modalAuthService.checkTokenExpiration()
    this.subscription = this._tablasServices.obserbableTabla('locomotoras').subscribe(() => {
      this.cargarTabla()
    } )
  }
  cargarTabla(){
    this._catalogoServices.getDataCatalogos('locomotoras').subscribe(data =>{
      this.catalogoData = data.Catalog.locomotoras
      this.dataSource.data = this.catalogoData
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
  nuevaLocomotora : Locomotora = {
    id_loco: 0,
    desc_loco: '',
    fk_mantenedor: 0,
    activo: '',
    fecha_registro: '',
    fecha_actualizacion: ''
  };
  openEditDialog(element: Locomotora , TipoBoton : string): void {
    this._habilitarServices.openEditDialog('locomotoras' , element , TipoBoton)
  }
   //cambio de estatus
   cambiarEstatus(acciones : Locomotora , estatus : string): void {
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
        const catalogo = 'locomotoras'
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
