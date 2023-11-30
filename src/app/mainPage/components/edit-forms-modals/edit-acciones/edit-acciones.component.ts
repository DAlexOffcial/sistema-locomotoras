import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Acciones } from 'src/app/mainPage/interfaces/catalogos';
import { HabilitarService } from 'src/app/mainPage/services/Habilitar.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-acciones',
  templateUrl: './edit-acciones.component.html',
  styleUrls: ['./edit-acciones.component.css']
})
export class EditAccionesComponent {

  dataAcciones!: Acciones

  Accionesforms: FormGroup

  constructor(private dialog: MatDialog, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private _habiliatarServices: HabilitarService) {
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
      const DescAccion = this.Accionesforms.value.desc_accion
      console.log(DescAccion);
      this.dataAcciones.desc_accion = DescAccion



      this._habiliatarServices.cambiarEstatus('acciones', this.dataAcciones).subscribe(data => {
        console.log(JSON.stringify(data))
        Swal.fire({
          title: "Registro editado!",
          icon: "success"
        });
        this.close()
      }, (error) => {
        console.log(error)
      })
    } else {
      this.Accionesforms.markAllAsTouched();
    }

  }
}
