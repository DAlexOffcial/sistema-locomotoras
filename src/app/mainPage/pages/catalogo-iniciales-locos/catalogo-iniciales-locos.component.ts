import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CatalogosService } from '../../services/catalogos.service';
import { MatTableDataSource } from '@angular/material/table';
import { InicialesLoco } from '../../interfaces/catalogos';
import Swal from 'sweetalert2';
import { HabilitarService } from '../../services/edit.service';
import { Subscription } from 'rxjs';
import { ModalAuthService } from 'src/app/services/AuthExpiration.service';
@Component({
  selector: 'app-catalogo-iniciales-locos',
  templateUrl: './catalogo-iniciales-locos.component.html',
  styleUrls: ['./catalogo-iniciales-locos.component.css']
})
export class CatalogoInicialesLocosComponent implements AfterViewInit , OnInit{
  private subscription: Subscription = new Subscription();
  displayedColumns : string[] = ['acciones', 'desc_inicial_loco', 'activo', 'fecha_registro', 'fecha_actualizacion']
  dataSource = new MatTableDataSource<InicialesLoco>();
  @ViewChild(MatPaginator, {static :true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor (private _catalogoServices: CatalogosService ,  private _habilitarServices: HabilitarService , private _modalAuthService: ModalAuthService){
    this.cargarTabla()
  }
  ngOnInit(): void {
    this._modalAuthService.checkTokenExpiration()
    this.subscription = this._habilitarServices.obserbableTabla('iniciales_locos').subscribe(() => {
      this.cargarTabla()
    } )
  }
  cargarTabla(){
    this._catalogoServices.getDataCatalogos('iniciales_locos').subscribe(data =>{
      this.dataSource.data = data
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
  nuevaInicial_locos : InicialesLoco = {
    id_inicial_loco: 0,
    desc_inicial_loco: '',
    activo: '',
    fecha_registro: '',
    fecha_actualizacion: ''
  };
  //modals
  openEditDialog(element : InicialesLoco , TipoBoton: string): void {
    this._habilitarServices.openEditDialog('iniciales_locos', element , TipoBoton )
  }
  //cambio de estatus
  cambiarEstatus(acciones : InicialesLoco , estatus : string): void {
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
        const catalogo = 'iniciales_locos'
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
