import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Entregas } from 'src/app/mainPage/interfaces/catalogos';
import { HabilitarService } from 'src/app/mainPage/services/Habilitar.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-entregas',
  templateUrl: './edit-entregas.component.html',
  styleUrls: ['./edit-entregas.component.css']
})
export class EditEntregasComponent {

  dataEntregas!: Entregas
 
  Entregasforms: FormGroup

  constructor(private dialog: MatDialog , private fb: FormBuilder , @Inject(MAT_DIALOG_DATA) public data: any , private _habiliatarServices : HabilitarService){
    this.Entregasforms = this.fb.group({
      desc_tipo_entrega: ['', Validators.required],
    })
     this.dataEntregas = data.element
    console.log(this.dataEntregas.id_tipo_entrega)
    
  }

  close(){
    this.Entregasforms.clearValidators(); // Limpiar validadores
    this.Entregasforms.updateValueAndValidity();
    this.dialog.closeAll();
 }
   
  editForm() {
     if (this.Entregasforms.valid){
      const DescEntregas = this.Entregasforms.value.desc_tipo_entrega
      console.log(DescEntregas);
      this.dataEntregas.desc_tipo_entrega = DescEntregas

     
 
      this._habiliatarServices.cambiarEstatus('entregas' , this.dataEntregas).subscribe(data=> {
       console.log(JSON.stringify(data))
       Swal.fire({
        title: "Registro editado!",
        icon: "success"
      });
      this.close()
      }, (error) =>{
       console.log(error)
      } )  
     } else {
      this.Entregasforms.markAllAsTouched();
     }

  }

   
}
