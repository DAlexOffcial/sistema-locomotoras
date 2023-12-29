import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CatalogosService } from '../../services/catalogos.service';
import { Mantenedore } from '../../interfaces/catalogos';
import Swal from 'sweetalert2';
import { HabilitarService } from '../../services/edit.service';
import { Subscription } from 'rxjs';
import { ModalAuthService } from 'src/app/services/AuthExpiration.service';
@Component({
  selector: 'app-catalogo-mantenedores',
  templateUrl: './catalogo-mantenedores.component.html',
  styleUrls: ['./catalogo-mantenedores.component.css']
})
export class CatalogoMantenedoresComponent implements AfterViewInit , OnInit{
  private subscription: Subscription = new Subscription();
  displayedColumns : string[] = ['acciones', 'desc_mantenedor', 'activo', 'fecha_registro', 'fecha_actualizacion']
  dataSource = new MatTableDataSource<Mantenedore>();
  @ViewChild(MatPaginator, {static :true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor (private _catalogoServices: CatalogosService , private _habilitarServices: HabilitarService, private _modalAuthService: ModalAuthService ){
    this.cargarTabla()
  }
  ngOnInit(): void {
    this._modalAuthService.checkTokenExpiration()
    this.subscription = this._habilitarServices.obserbableTabla('mantenedores').subscribe(() => {
      this.cargarTabla()
    } )
  }
  cargarTabla(){
    this._catalogoServices.getDataCatalogos('mantenedores').subscribe(data =>{
      this.dataSource.data = data
     })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Mantenedores por pagina: '
    this.dataSource.sort = this.sort
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  nuevoMantenedor : Mantenedore = {
    id_mantenedor: 0,
    desc_mantenedor: '',
    activo: '',
    fecha_registro: '',
    fecha_actualizacion: ''
  };
  //modals
  openEditDialog(element : Mantenedore , TipoBoton: string): void {
    this._habilitarServices.openEditDialog('mantenedores' , element , TipoBoton)
  }
  cambiarEstatus(acciones : Mantenedore , estatus : string): void {
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
          title:(acciones.activo === '0') ? "tu accion esta habilitar" : "tu accion esta desahabilitar",
          icon: "success"
        });
        //va al servicio
        acciones.activo = estatus
        const catalogo = 'mantenedores'
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
