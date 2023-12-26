import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Acciones } from 'src/app/mainPage/interfaces/catalogos';
import { CatalogosService } from 'src/app/mainPage/services/catalogos.service';

import { HabilitarService } from 'src/app/mainPage/services/edit.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-acciones',
  templateUrl: './edit-acciones.component.html',
  styleUrls: ['./edit-acciones.component.css']
})
export class EditAccionesComponent {

  dataAcciones!: Acciones

  Accionesforms: FormGroup

  constructor(private dialog: MatDialog, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private _habiliatarServices: HabilitarService , private _catalogosService: CatalogosService) {
    this.Accionesforms = this.fb.group({
      desc_accion: ['', Validators.required],
    })
    this.dataAcciones = data.element


  }

  close() {
    this.Accionesforms.clearValidators(); // Limpiar validadores
    this.Accionesforms.updateValueAndValidity();
    this.dialog.closeAll();
  }

  editForm() {
    if (this.Accionesforms.valid) {
      const DescAccion : string = this.Accionesforms.value.desc_accion;
      this.dataAcciones.desc_accion = DescAccion.toUpperCase();
  
      if (this.data.TipoBoton == 'add') {
        this._catalogosService.crearCatalogo('acciones', this.dataAcciones).subscribe(
          (data) => {
            Swal.fire({
              title: 'Registro agregado!',
              icon: 'success',
            });
            this._habiliatarServices.TriggerTabla('acciones');
            this.close();
          },
          (error) => {
            this._habiliatarServices.TriggerTabla('acciones');
          }
        );
      } else if (this.data.TipoBoton == 'edit') {
        this._catalogosService.editarCatalogo('acciones', this.dataAcciones).subscribe(
          (data) => {
            Swal.fire({
              title: 'Registro editado!',
              icon: 'success',
            });
            this._habiliatarServices.TriggerTabla('acciones');
            this.close();
          },
          (error) => {
            this._habiliatarServices.TriggerTabla('acciones');
          }
        );
      } 
    } else {
      this.Accionesforms.markAllAsTouched();
    }
  }
  
}
