import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Banio } from 'src/app/mainPage/interfaces/catalogos';
import { CatalogosService } from 'src/app/mainPage/services/catalogos.service';

import { HabilitarService } from 'src/app/mainPage/services/edit.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-banios',
  templateUrl: './edit-banios.component.html',
  styleUrls: ['./edit-banios.component.css']
})
export class EditBaniosComponent {
  
  dataBanio!: Banio
 
  Banioforms: FormGroup

  constructor(private dialog: MatDialog , private fb: FormBuilder , @Inject(MAT_DIALOG_DATA) public data: any , private _habiliatarServices : HabilitarService, private _catalogosService:CatalogosService){
    this.Banioforms = this.fb.group({
      desc_banio: ['', [Validators.required , Validators.maxLength(20)]],
    })
     this.dataBanio = data.element
  }

  close(){
    this.Banioforms.clearValidators(); // Limpiar validadores
    this.Banioforms.updateValueAndValidity();
    this.dialog.closeAll();
 }
   
 editForm() {
  if (this.Banioforms.valid) {
    const DescBanio : string = this.Banioforms.value.desc_banio;
    this.dataBanio.desc_banio = DescBanio.toUpperCase();

    if (this.data.TipoBoton == 'add') {
      this._catalogosService.crearCatalogo('banios', this.dataBanio).subscribe(
        (data) => {
          Swal.fire({
            title: 'Registro agregado!',
            icon: 'success',
          });
          this._habiliatarServices.TriggerTabla('banios');
          this.close();
        },
        (error) => {
          this._habiliatarServices.TriggerTabla('banios');
        }
      );
    } else if (this.data.TipoBoton == 'edit') {
      this._catalogosService.editarCatalogo('banios', this.dataBanio).subscribe(
        (data) => {

          Swal.fire({
            title: 'Registro editado!',
            icon: 'success',
          });
          this._habiliatarServices.TriggerTabla('banios');
          this.close();
        },
        (error) => {
          this._habiliatarServices.TriggerTabla('banios');
        }
      );
    } 
  } else {
    this.Banioforms.markAllAsTouched();
  }
}

}
