import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CatalogosService } from '../../services/catalogos.service';
import { MatTableDataSource } from '@angular/material/table';
import { Cil } from '../../interfaces/catalogos';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { HabilitarService } from '../../services/edit.service';
import { TablasService } from '../../services/Tablas.service';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { ModalAuthService } from 'src/app/services/modalAuth.service';
@Component({
  selector: 'app-catalogo-cli',
  templateUrl: './catalogo-cli.component.html',
  styleUrls: ['./catalogo-cli.component.css']
})
export class CatalogoCliComponent implements AfterViewInit , OnInit{
  private subscription: Subscription = new Subscription();
  displayedColumns : string[] = [ 'acciones' , 'id_cil', 'desc_cil', 'activo', 'fecha_registro', 'fecha_actualizacion', 'PUESTO_TRABAJO']
  dataSource = new MatTableDataSource<any>();
  catalogoData: Cil[] = []
  @ViewChild(MatPaginator, {static :true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor (private _catalogoServices: CatalogosService , private _habilitarServices: HabilitarService , private _tablaService : TablasService , private _modalAuthService : ModalAuthService){
    this.cargarTabla()
  }
  ngOnInit(): void {
    this._modalAuthService.checkTokenExpiration()
     this.subscription = this._tablaService.obserbableTabla('cil').subscribe(() => {
      this.cargarTabla()
     })
  }
  ngOnDestroy() {
    // Liberar la suscripción para evitar posibles fugas de memoria
    this.subscription.unsubscribe();
  }
  cargarTabla(){
    this._catalogoServices.getDataCatalogos('cil').subscribe(data =>{
      this.catalogoData = data.Catalog.cil
      this.dataSource.data = this.catalogoData
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
  nuevoCil: Cil = {
    id_cil: '',
    desc_cil: '',
    activo: '',
    fecha_registro: new Date(),
    fecha_actualizacion: new Date(),
    PUESTO_TRABAJO: '',
  };
  //modals
  openAddDialog( element: Cil ,  TipoBoton: string): void {
    this._habilitarServices.openAddDialogCil(element , TipoBoton)
  }
  openEditDialog(elements: Cil , tipoBoton : string): void {
    this._habilitarServices.openEditDialog('cil' , elements , tipoBoton)
  }
  //botones
    cambiarEstatus(acciones : Cil , estatus : string): void {
      Swal.fire({
        title: (acciones.activo === '0') ? "¿Quieres habilitar este Cil?" : "¿Quieres desahabilitar este Cil?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        text: (acciones.activo === '0') ? `Se habilitara : ${acciones.id_cil}` : `Se desahabilitara : ${acciones.id_cil}`,
        confirmButtonText: (acciones.activo === '0') ? "habilitar" : "desahabilitar",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title:(acciones.activo === '0') ? "Tu Cil esta habilitada" : "Tu Cil esta desahabilitada",
            icon: "success"
          });
          //va al servicio
          acciones.activo = estatus
          const catalogo = 'cil'
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
