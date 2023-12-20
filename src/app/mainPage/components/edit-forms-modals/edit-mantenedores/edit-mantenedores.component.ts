import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Mantenedore } from 'src/app/mainPage/interfaces/catalogos';
import { CreateService } from 'src/app/mainPage/services/Create.service';
import { HabilitarService } from 'src/app/mainPage/services/edit.service';
import { TablasService } from 'src/app/mainPage/services/Tablas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-mantenedores',
  templateUrl: './edit-mantenedores.component.html',
  styleUrls: ['./edit-mantenedores.component.css']
})
export class EditMantenedoresComponent {
  
  dataMantenedor!: Mantenedore
 
  Mantenedorforms: FormGroup

  constructor(private dialog: MatDialog , private fb: FormBuilder , @Inject(MAT_DIALOG_DATA) public data: any , private _habiliatarServices : HabilitarService , private _createServices:CreateService , private _tablaService: TablasService){
    this.Mantenedorforms = this.fb.group({
      desc_mantenedor: ['', [Validators.required , Validators.maxLength(20)]],
    })
     this.dataMantenedor = data.element

  }

  close(){
    this.Mantenedorforms.clearValidators(); // Limpiar validadores
    this.Mantenedorforms.updateValueAndValidity();
    this.dialog.closeAll();
 }
   
 editForm() {
  if (this.Mantenedorforms.valid) {
    const DescMantenedor = this.Mantenedorforms.value.desc_mantenedor;

    this.dataMantenedor.desc_mantenedor = DescMantenedor;

    if (this.data.TipoBoton == 'add') {

      this._createServices.cambiarEstatus('mantenedores', this.dataMantenedor).subscribe(
        (data) => {

          Swal.fire({
            title: 'Registro editado!',
            icon: 'success',
          });
          this._tablaService.TriggerTabla('mantenedores');
          this.close();
        },
        (error) => {
          this._tablaService.TriggerTabla('mantenedores');

        }
      );
    } else if (this.data.TipoBoton == 'edit') {
      this._habiliatarServices.cambiarEstatus('mantenedores', this.dataMantenedor).subscribe(
        (data) => {

          Swal.fire({
            title: 'Registro editado!',
            icon: 'success',
          });
          this._tablaService.TriggerTabla('mantenedores');
          this.close();
        },
        (error) => {
          this._tablaService.TriggerTabla('mantenedores');

        }
      );
    } 
  } else {
    this.Mantenedorforms.markAllAsTouched();
  }
}

}
