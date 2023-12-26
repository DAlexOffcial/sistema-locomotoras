import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CatalogosService } from '../../services/catalogos.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Acciones } from '../../interfaces/catalogos';
import { HabilitarService } from '../../services/edit.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { ModalAuthService } from 'src/app/services/modalAuth.service';

@Component({
  selector: 'app-catalogo-acciones',
  templateUrl: './catalogo-acciones.component.html',
  styleUrls: ['./catalogo-acciones.component.css']
})
export class CatalogoAccionesComponent implements AfterViewInit, OnInit {
  
  private subscription: Subscription = new Subscription();

  displayedColumns : string[] = ['acciones', 'desc_accion', 'activo' , 'fecha_registro' , 'fecha_actualizacion']

  dataSource = new MatTableDataSource<Acciones>();

  @ViewChild(MatPaginator, {static :true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (private _catalogoServices: CatalogosService,  private _habilitarServices: HabilitarService , private _modalAuthService :ModalAuthService){
    this.cargarTabla()
  }

  ngOnInit(): void {
      this._modalAuthService.checkTokenExpiration()
      this.subscription = this._habilitarServices.obserbableTabla('acciones').subscribe(() => {

      this.cargarTabla()
    } )
  }

  cargarTabla():void{
    this._catalogoServices.getDataCatalogos('acciones').subscribe(data =>{
      this.dataSource.data = data
     })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Acciones por pagina: '
    this.dataSource.sort = this.sort
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  nuevaAccion : Acciones = {
    id_accion: 0,
    desc_accion: '',
    activo: '',
    fecha_registro: '',
    fecha_actualizacion: ''
  };
  //modals
  openEditDialog(element : Acciones , tipoBoton: string): void {
    this._habilitarServices.openEditDialog('acciones' , element, tipoBoton)
  }

    
  //cambio de estatus
  cambiarEstatus(acciones : Acciones , estatus : string): void {

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
        const catalogo = 'acciones'
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
