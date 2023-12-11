import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Inspecciones } from 'src/app/mainPage/interfaces/catalogos';
import { CreateService } from 'src/app/mainPage/services/Create.service';
import { HabilitarService } from 'src/app/mainPage/services/edit.service';
import { TablasService } from 'src/app/mainPage/services/Tablas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-inspecciones',
  templateUrl: './edit-inspecciones.component.html',
  styleUrls: ['./edit-inspecciones.component.css']
})
export class EditInspeccionesComponent {

  dataInspecciones!: Inspecciones

  inspeccionesForm: FormGroup

  constructor(private dialog: MatDialog, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private _habiliatarServices: HabilitarService , private _createServices:CreateService , private _tablaService: TablasService) {
    const SoloNumeros = /^[0-9]*$/;

    this.inspeccionesForm = this.fb.group({
      tipo_inspeccion: ['', [Validators.required, Validators.maxLength(3)]],
      desc_tipo_inspeccion: ['', [Validators.required, Validators.maxLength(50)]],
      tiempo_meta: ['', [Validators.required, Validators.maxLength(4), Validators.pattern(SoloNumeros)]],
    })
    this.dataInspecciones = data.element
    console.log(this.dataInspecciones.id_tipo_inspeccion)

  }

  close() {
    this.inspeccionesForm.clearValidators(); // Limpiar validadores
    this.inspeccionesForm.updateValueAndValidity();
    this.dialog.closeAll();
  }

  editForm() {
    if (this.inspeccionesForm.valid) {
      const TipoInspc : string = this.inspeccionesForm.value.tipo_inspeccion;
      const DescTipoInsp : string = this.inspeccionesForm.value.desc_tipo_inspeccion;
      const TiempoMeta : number = this.inspeccionesForm.value.tiempo_meta;
  
      this.dataInspecciones.tipo_inspeccion = TipoInspc.toUpperCase();
      this.dataInspecciones.desc_tipo_inspeccion = DescTipoInsp.toUpperCase();
      this.dataInspecciones.tiempo_meta = TiempoMeta;
  
      if (this.data.TipoBoton == 'add') {
        console.log(this.dataInspecciones);
        this._createServices.cambiarEstatus('inspecciones', this.dataInspecciones).subscribe(
          (data) => {
            console.log(JSON.stringify(data));
            Swal.fire({
              title: 'Registro agregado!',
              icon: 'success',
            });
            this._tablaService.TriggerTabla('inspecciones')
            this.close();
          },
          (error) => {
            console.log(error);
          }
        );
      } else if (this.data.TipoBoton == 'edit') {
        this._habiliatarServices.cambiarEstatus('inspecciones', this.dataInspecciones).subscribe(
          (data) => {
            console.log(JSON.stringify(data));
            Swal.fire({
              title: 'Registro editado!',
              icon: 'success',
            });
            this._tablaService.TriggerTabla('inspecciones')
            this.close();
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        this.inspeccionesForm.markAllAsTouched();
      }
    } else {
      this.inspeccionesForm.markAllAsTouched();
    }
  }

}
