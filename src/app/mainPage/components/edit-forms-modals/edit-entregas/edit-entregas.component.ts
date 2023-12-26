import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Entregas } from 'src/app/mainPage/interfaces/catalogos';
import { CatalogosService } from 'src/app/mainPage/services/catalogos.service';

import { HabilitarService } from 'src/app/mainPage/services/edit.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-entregas',
  templateUrl: './edit-entregas.component.html',
  styleUrls: ['./edit-entregas.component.css']
})
export class EditEntregasComponent {

  dataEntregas!: Entregas
 
  Entregasforms: FormGroup

  constructor(private dialog: MatDialog , private fb: FormBuilder , @Inject(MAT_DIALOG_DATA) public data: any , private _habiliatarServices : HabilitarService , private _catalogosService:CatalogosService ){
    this.Entregasforms = this.fb.group({
      desc_tipo_entrega: ['', Validators.required],
    })
     this.dataEntregas = data.element

  }

  close(){
    this.Entregasforms.clearValidators(); // Limpiar validadores
    this.Entregasforms.updateValueAndValidity();
    this.dialog.closeAll();
 }
   
 editForm() {
  if (this.Entregasforms.valid) {
    const DescEntregas : string = this.Entregasforms.value.desc_tipo_entrega;
    this.dataEntregas.desc_tipo_entrega = DescEntregas.toUpperCase();

    if (this.data.TipoBoton == 'add') {

      this._catalogosService.crearCatalogo('entregas', this.dataEntregas).subscribe(
        (data) => {

          Swal.fire({
            title: 'Registro agregado!',
            icon: 'success',
          });
          this._habiliatarServices.TriggerTabla('entregas');
          this.close();
        },
        (error) => {
          this._habiliatarServices.TriggerTabla('entregas');

        }
      );
    } else if (this.data.TipoBoton == 'edit') {
      this._catalogosService.editarCatalogo('entregas', this.dataEntregas).subscribe(
        (data) => {

          Swal.fire({
            title: 'Registro editado!',
            icon: 'success',
          });
          this._habiliatarServices.TriggerTabla('entregas');
          this.close();
        },
        (error) => {
          this._habiliatarServices.TriggerTabla('entregas');

        }
      );
    } 
  } else {
    this.Entregasforms.markAllAsTouched();
  }
}


   
}
