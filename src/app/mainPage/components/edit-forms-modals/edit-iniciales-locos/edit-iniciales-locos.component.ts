import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { InicialesLoco } from 'src/app/mainPage/interfaces/catalogos';
import { CreateService } from 'src/app/mainPage/services/Create.service';
import { HabilitarService } from 'src/app/mainPage/services/Habilitar.service';
import { TablasService } from 'src/app/mainPage/services/Tablas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-iniciales-locos',
  templateUrl: './edit-iniciales-locos.component.html',
  styleUrls: ['./edit-iniciales-locos.component.css']
})
export class EditInicialesLocosComponent {

  dataInicales_locos!: InicialesLoco
 
  Iniciales_locosforms: FormGroup

  constructor(private dialog: MatDialog , private fb: FormBuilder , @Inject(MAT_DIALOG_DATA) public data: any , private _habiliatarServices : HabilitarService , private _createServices:CreateService , private _tablaService: TablasService){
    this.Iniciales_locosforms = this.fb.group({
      desc_inicial_loco: ['', [Validators.required , Validators.maxLength(4)]],
    })
     this.dataInicales_locos = data.element
    console.log(this.dataInicales_locos.id_inicial_loco)
    
  }

  close(){
    this.Iniciales_locosforms.clearValidators(); // Limpiar validadores
    this.Iniciales_locosforms.updateValueAndValidity();
    this.dialog.closeAll();
 }
   
editForm() {
  if (this.Iniciales_locosforms.valid) {
    const DescIniciales_locos : string = this.Iniciales_locosforms.value.desc_inicial_loco;
    this.dataInicales_locos.desc_inicial_loco = DescIniciales_locos.toUpperCase();

    if (this.data.TipoBoton == 'add') {
      console.log(this.dataInicales_locos);
      this._createServices.cambiarEstatus('iniciales_locos', this.dataInicales_locos).subscribe(
        (data) => {
          console.log(JSON.stringify(data));
          Swal.fire({
            title: 'Registro agregado!',
            icon: 'success',
          });
          this._tablaService.TriggerTabla('iniciales_locos');
          this.close();
        },
        (error) => {
          console.log(error);
        }
      );
    } else if (this.data.TipoBoton == 'edit') {
      this._habiliatarServices.cambiarEstatus('iniciales_locos', this.dataInicales_locos).subscribe(
        (data) => {
          console.log(JSON.stringify(data));
          Swal.fire({
            title: 'Registro editado!',
            icon: 'success',
          });
          this._tablaService.TriggerTabla('iniciales_locos');
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
    this.Iniciales_locosforms.markAllAsTouched();
  }
}

}
