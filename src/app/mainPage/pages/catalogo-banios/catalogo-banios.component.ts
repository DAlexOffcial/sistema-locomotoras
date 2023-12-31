import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CatalogosService } from '../../services/catalogos.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Banio } from '../../interfaces/catalogos';
import Swal from 'sweetalert2';
import { HabilitarService } from '../../services/edit.service';
import { Subscription } from 'rxjs';
import { ModalAuthService } from 'src/app/services/AuthExpiration.service';
@Component({
  selector: 'app-catalogo-banios',
  templateUrl: './catalogo-banios.component.html',
  styleUrls: ['./catalogo-banios.component.css']
})
export class CatalogoBaniosComponent implements AfterViewInit , OnInit{
  private subscription: Subscription = new Subscription();
  displayedColumns : string[] = [ 'acciones' ,'desc_banio', 'activo' , 'fecha_registro' , 'fecha_actualizacion']
  dataSource = new MatTableDataSource<Banio>();

  @ViewChild(MatPaginator, {static :true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor (private _catalogoServices: CatalogosService ,  private _habilitarServices: HabilitarService , private _modalAuthService :ModalAuthService){
    this.cargarTabla()
  }
  ngOnInit(): void {
    this._modalAuthService.checkTokenExpiration()
    this.subscription = this._habilitarServices.obserbableTabla('banios').subscribe(() => {
      this.cargarTabla()
    } )
  }
  cargarTabla():void{
    this._catalogoServices.getDataCatalogos('banios').subscribe(data =>{
      this.dataSource.data = data
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
  nuevoBanio : Banio = {
    id_banio: 0,
    desc_banio: '',
    activo: '',
    fecha_registro: '',
    fecha_actualizacion: ''
  };
  //modals
  openEditDialog(element : Banio , TipoBoton: string): void {
    this._habilitarServices.openEditDialog('banios' , element , TipoBoton)
  }
  //cambio de estatus
  cambiarEstatus(acciones : Banio , estatus : string): void {
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
        const catalogo = 'banios'
        this._catalogoServices.editarCatalogo(catalogo , acciones).subscribe(res => {
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
