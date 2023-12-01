import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Acciones } from 'src/app/mainPage/interfaces/catalogos';
import { CreateService } from 'src/app/mainPage/services/Create.service';
import { HabilitarService } from 'src/app/mainPage/services/Habilitar.service';
import { TablasService } from 'src/app/mainPage/services/Tablas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-acciones',
  templateUrl: './edit-acciones.component.html',
  styleUrls: ['./edit-acciones.component.css']
})
export class EditAccionesComponent {

  dataAcciones!: Acciones

  Accionesforms: FormGroup

  constructor(private dialog: MatDialog, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private _habiliatarServices: HabilitarService , private _createServices:CreateService , private _tablaService: TablasService) {
    this.Accionesforms = this.fb.group({
      desc_accion: ['', Validators.required],
    })
    this.dataAcciones = data.element
    console.log(this.dataAcciones.id_accion)

  }

  close() {
    this.Accionesforms.clearValidators(); // Limpiar validadores
    this.Accionesforms.updateValueAndValidity();
    this.dialog.closeAll();
  }

  editForm() {
    if (this.Accionesforms.valid) {
      const DescAccion = this.Accionesforms.value.desc_accion;
      this.dataAcciones.desc_accion = DescAccion;
  
      if (this.data.TipoBoton == 'add') {
        console.log(this.dataAcciones);
        this._createServices.cambiarEstatus('acciones', this.dataAcciones).subscribe(
          (data) => {
            console.log(JSON.stringify(data));
            Swal.fire({
              title: 'Registro agregado!',
              icon: 'success',
            });
            this._tablaService.TriggerTabla('acciones');
            this.close();
          },
          (error) => {
            console.log(error);
          }
        );
      } else if (this.data.TipoBoton == 'edit') {
        this._habiliatarServices.cambiarEstatus('acciones', this.dataAcciones).subscribe(
          (data) => {
            console.log(JSON.stringify(data));
            Swal.fire({
              title: 'Registro editado!',
              icon: 'success',
            });
            this._tablaService.TriggerTabla('acciones');
            this.close();
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        // Handle other scenarios if needed
      }
    } else {
      this.Accionesforms.markAllAsTouched();
    }
  }
  
}
