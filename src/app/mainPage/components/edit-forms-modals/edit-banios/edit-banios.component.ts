import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Banio } from 'src/app/mainPage/interfaces/catalogos';
import { HabilitarService } from 'src/app/mainPage/services/Habilitar.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-banios',
  templateUrl: './edit-banios.component.html',
  styleUrls: ['./edit-banios.component.css']
})
export class EditBaniosComponent {
  
  dataBanio!: Banio
 
  Banioforms: FormGroup

  constructor(private dialog: MatDialog , private fb: FormBuilder , @Inject(MAT_DIALOG_DATA) public data: any , private _habiliatarServices : HabilitarService){
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
     if (this.Banioforms.valid){
      const DescBanio = this.Banioforms.value.desc_banio
      console.log(DescBanio);
      this.dataBanio.desc_banio = DescBanio

     
 
      this._habiliatarServices.cambiarEstatus('banios' , this.dataBanio).subscribe(data=> {
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
      this.Banioforms.markAllAsTouched();
     }

  }
}
