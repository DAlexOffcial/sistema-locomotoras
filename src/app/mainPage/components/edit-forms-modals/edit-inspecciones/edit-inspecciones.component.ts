import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Inspecciones } from 'src/app/mainPage/interfaces/catalogos';
import { CatalogosService } from 'src/app/mainPage/services/catalogos.service';
import { HabilitarService } from 'src/app/mainPage/services/edit.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-inspecciones',
  templateUrl: './edit-inspecciones.component.html',
  styleUrls: ['./edit-inspecciones.component.css']
})
export class EditInspeccionesComponent {

  dataInspecciones!: Inspecciones

  inspeccionesForm: FormGroup

  constructor(private dialog: MatDialog, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private _habiliatarServices: HabilitarService, private _catalogosService: CatalogosService) {
    const SoloNumeros = /^[0-9]*$/;

    this.inspeccionesForm = this.fb.group({
      tipo_inspeccion: ['', [Validators.required, Validators.maxLength(3)]],
      desc_tipo_inspeccion: ['', [Validators.required, Validators.maxLength(50)]],
      tiempo_meta: ['', [Validators.required, Validators.maxLength(4), Validators.pattern(SoloNumeros)]],
    })
    this.dataInspecciones = data.element
  }

  close() {
    this.inspeccionesForm.clearValidators(); // Limpiar validadores
    this.inspeccionesForm.updateValueAndValidity();
    this.dialog.closeAll();
  }

  editForm() {
    if (this.inspeccionesForm.valid) {
      const TipoInspc: string = this.inspeccionesForm.value.tipo_inspeccion;
      const DescTipoInsp: string = this.inspeccionesForm.value.desc_tipo_inspeccion;
      const TiempoMeta: number = this.inspeccionesForm.value.tiempo_meta;

      this.dataInspecciones.tipo_inspeccion = TipoInspc.toUpperCase();
      this.dataInspecciones.desc_tipo_inspeccion = DescTipoInsp.toUpperCase();
      this.dataInspecciones.tiempo_meta = TiempoMeta;

      if (this.data.TipoBoton == 'add') {
        this._catalogosService.crearCatalogo('inspecciones', this.dataInspecciones).subscribe(
          (data) => {

            Swal.fire({
              title: 'Registro agregado!',
              icon: 'success',
            });
            this._habiliatarServices.TriggerTabla('inspecciones')
            this.close();
          },
          (error) => {
            this._habiliatarServices.TriggerTabla('inspecciones')

          }
        );
      } else {
        this.inspeccionesForm.markAllAsTouched();
      }
    } else if (this.data.TipoBoton == 'edit') {
      const TipoInspc: string = this.inspeccionesForm.value.tipo_inspeccion;
      const DescTipoInsp: string = this.inspeccionesForm.value.desc_tipo_inspeccion;
      const TiempoMeta: number = this.inspeccionesForm.value.tiempo_meta;

      if (TipoInspc.trim() === '') {
        this.dataInspecciones.tipo_inspeccion
      } else {
        this.dataInspecciones.tipo_inspeccion = TipoInspc.toUpperCase();
      }
      if (DescTipoInsp.trim() === '') {
        this.dataInspecciones.desc_tipo_inspeccion
      } else {
        this.dataInspecciones.desc_tipo_inspeccion = DescTipoInsp.toUpperCase();
      }

      if (!TiempoMeta) {
        this.dataInspecciones.tiempo_meta
      } else {
        this.dataInspecciones.tiempo_meta = TiempoMeta;
      }

      this._catalogosService.editarCatalogo('inspecciones', this.dataInspecciones).subscribe(
        (data) => {

          Swal.fire({
            title: 'Registro editado!',
            icon: 'success',
          });
          this._habiliatarServices.TriggerTabla('inspecciones')
          this.close();
        },
        (error) => {
          this._habiliatarServices.TriggerTabla('inspecciones')
        }
      )
    } else {
      this.inspeccionesForm.markAllAsTouched();
    }
  }

}
