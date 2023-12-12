import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { EmpleadosTablaService } from '../../services/EmpleadosTabla.service';
import { Empleado } from '../../interfaces/catalogos';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TablasService } from '../../services/Tablas.service';
import Swal from 'sweetalert2';
import { HabilitarService } from '../../services/edit.service';
import { UsuarioService } from '../../services/Usuario.service';
import { Usuario } from '../../interfaces/usuarios';

@Component({
  selector: 'app-catalogo-empleados',
  templateUrl: './catalogo-empleados.component.html',
  styleUrls: ['./catalogo-empleados.component.css']
})
export class CatalogoEmpleadosComponent implements OnInit , AfterViewInit{

  private subscription: Subscription = new Subscription();

  displayedColumns : string[] = [ 'acciones' , 'nombre_empl', 'apellido_empl', 'fk_funcion_empl', 'acceso_cil' , 'activo']

  catalogoData: Empleado [] = []

  dataUsuarios!: Usuario

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, {static :true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
   
  constructor(private _empleadosTablaService : EmpleadosTablaService , private _tablasServices : TablasService , private _habilitarServices:HabilitarService, private _usuarioService : UsuarioService ) {
    this.cargarTabla()
  }

  ngOnInit(): void {
      this.subscription = this._tablasServices.obserbableTabla('empleados').subscribe(() => {
      console.log('cargue la tabla de empleados')
      this.cargarTabla()
    } )
  }

  cargarTabla(){
    this._empleadosTablaService.getDataCatalogos().subscribe(data => {
      this.catalogoData = data.Catalog.empleados
      this.dataSource.data = this.catalogoData
      console.log(this.dataSource.data);
     })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Empleados por pagina: '
    this.dataSource.sort = this.sort
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  nuevoEmpleado: Empleado = {
    id_empleado: 0,
    nombre_empl: '',
    apellido_empl: '',
    fk_funcion_empl: 0,
    acceso_cil: '',
    activo: '',
    fecha_registro: '',
    fecha_actualizacion: ''
  };

  //edit create
  openAddDialog( element: Empleado ,  TipoBoton: string): void {
    this._habilitarServices.openAddDialogEmpleado(element , TipoBoton)
  }
  openPasswordDialog( element: Empleado ,  TipoBoton: string): void {
    this._habilitarServices.openPasswordDialogEmpleado(element , TipoBoton)
  }

  openEditDialog(element : Empleado , TipoBoton :  string): void {
    this._habilitarServices.openEditDialog('empleados', element , TipoBoton)
  }

   //cambio de estatus
   cambiarEstatus(acciones : Empleado , estatus : string): void {
    console.log(acciones.id_empleado)
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
          text: "Your file has been deleted.",
          icon: "success"
        });
        //va al servicio
        acciones.activo = estatus
        this._empleadosTablaService.cambiarEstatus(acciones).subscribe(res => {
          console.log(JSON.stringify(res));
          this.cargarTabla()
              
          this._usuarioService.getDataCatalogos(acciones.id_empleado).subscribe(data =>{
             this.dataUsuarios = data
              if(estatus === '1'){
                this.dataUsuarios.Status = true
              }else{
                this.dataUsuarios.Status = false
              }

             this._usuarioService.editUsuario(acciones , this.dataUsuarios).subscribe(data => {
              console.log(data);
             })
          })
        },(error) => {
          console.log(error)
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: 'Hubo un error con tu servidor',
          });
          this.cargarTabla()
        })
      }
    });
  }
  

}

