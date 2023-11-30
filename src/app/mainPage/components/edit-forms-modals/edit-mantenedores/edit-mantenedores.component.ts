import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Mantenedore } from 'src/app/mainPage/interfaces/catalogos';
import { HabilitarService } from 'src/app/mainPage/services/Habilitar.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-mantenedores',
  templateUrl: './edit-mantenedores.component.html',
  styleUrls: ['./edit-mantenedores.component.css']
})
export class EditMantenedoresComponent {
  
  dataMantenedor!: Mantenedore
 
  Mantenedorforms: FormGroup

  constructor(private dialog: MatDialog , private fb: FormBuilder , @Inject(MAT_DIALOG_DATA) public data: any , private _habiliatarServices : HabilitarService){
    this.Mantenedorforms = this.fb.group({
      desc_mantenedor: ['', Validators.required],
    })
     this.dataMantenedor = data.element
    console.log(this.dataMantenedor.id_mantenedor)
    
  }

  close(){
    this.Mantenedorforms.clearValidators(); // Limpiar validadores
    this.Mantenedorforms.updateValueAndValidity();
    this.dialog.closeAll();
 }
   
  editForm() {
     if (this.Mantenedorforms.valid){
      const DescMantenedor = this.Mantenedorforms.value.desc_mantenedor
      console.log(DescMantenedor);
      this.dataMantenedor.desc_mantenedor = DescMantenedor

      this._habiliatarServices.cambiarEstatus('mantenedores' , this.dataMantenedor).subscribe(data=> {
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
      this.Mantenedorforms.markAllAsTouched();
     }

  }
}
