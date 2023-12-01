import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CatalogosService } from '../../services/catalogos.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Acciones } from '../../interfaces/catalogos';
import { HabilitarService } from '../../services/Habilitar.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { TablasService } from '../../services/Tablas.service';

@Component({
  selector: 'app-catalogo-acciones',
  templateUrl: './catalogo-acciones.component.html',
  styleUrls: ['./catalogo-acciones.component.css']
})
export class CatalogoAccionesComponent implements AfterViewInit, OnInit {
  
  private subscription: Subscription = new Subscription();

  displayedColumns : string[] = ['acciones', 'desc_accion', 'activo' , 'fecha_registro' , 'fecha_actualizacion']

  dataSource = new MatTableDataSource<any>();

  catalogoData: Acciones[] = []

  @ViewChild(MatPaginator, {static :true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (private _catalogoServices: CatalogosService,  private _habilitarServices: HabilitarService , private _tablasServices : TablasService){
    this.cargarTabla()
  }

  ngOnInit(): void {
      this.subscription = this._tablasServices.obserbableTabla('acciones').subscribe(() => {
      console.log('cargue la tabla de inspecciones')
      this.cargarTabla()
    } )
  }

  cargarTabla():void{
    this._catalogoServices.getDataCatalogos('acciones').subscribe(data =>{
      this.catalogoData = data.Catalog.acciones
      this.dataSource.data = this.catalogoData
      console.log(this.catalogoData)
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
    console.log(acciones.id_accion)
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
        const catalogo = 'acciones'
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
