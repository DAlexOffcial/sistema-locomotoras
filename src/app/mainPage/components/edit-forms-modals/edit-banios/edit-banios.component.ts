import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Banio } from 'src/app/mainPage/interfaces/catalogos';
import { CreateService } from 'src/app/mainPage/services/Create.service';
import { HabilitarService } from 'src/app/mainPage/services/Habilitar.service';
import { TablasService } from 'src/app/mainPage/services/Tablas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-banios',
  templateUrl: './edit-banios.component.html',
  styleUrls: ['./edit-banios.component.css']
})
export class EditBaniosComponent {
  
  dataBanio!: Banio
 
  Banioforms: FormGroup

  constructor(private dialog: MatDialog , private fb: FormBuilder , @Inject(MAT_DIALOG_DATA) public data: any , private _habiliatarServices : HabilitarService, private _createServices:CreateService , private _tablaService: TablasService){
    this.Banioforms = this.fb.group({
      desc_banio: ['', Validators.required],
    })
     this.dataBanio = data.element
    console.log(this.dataBanio.desc_banio)
    
  }

  close(){
    this.Banioforms.clearValidators(); // Limpiar validadores
    this.Banioforms.updateValueAndValidity();
    this.dialog.closeAll();
 }
   
 editForm() {
  if (this.Banioforms.valid) {
    const DescBanio = this.Banioforms.value.desc_banio;
    this.dataBanio.desc_banio = DescBanio;

    if (this.data.TipoBoton == 'add') {
      console.log(this.dataBanio);
      this._createServices.cambiarEstatus('banios', this.dataBanio).subscribe(
        (data) => {
          console.log(JSON.stringify(data));
          Swal.fire({
            title: 'Registro agregado!',
            icon: 'success',
          });
          this._tablaService.TriggerTabla('banios');
          this.close();
        },
        (error) => {
          console.log(error);
        }
      );
    } else if (this.data.TipoBoton == 'edit') {
      this._habiliatarServices.cambiarEstatus('banios', this.dataBanio).subscribe(
        (data) => {
          console.log(JSON.stringify(data));
          Swal.fire({
            title: 'Registro editado!',
            icon: 'success',
          });
          this._tablaService.TriggerTabla('banios');
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
    this.Banioforms.markAllAsTouched();
  }
}

}
