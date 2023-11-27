import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog , MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Cil } from 'src/app/mainPage/interfaces/catalogos-cil';
import { HabilitarService } from 'src/app/mainPage/services/Habilitar.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-cil',
  templateUrl: './edit-cil.component.html',
  styleUrls: ['./edit-cil.component.css']
})
export class EditCilComponent {

  dataCil!: Cil
 
  Cilforms: FormGroup

  constructor(private dialog: MatDialog , private fb: FormBuilder , @Inject(MAT_DIALOG_DATA) public data: any , private _habiliatarServices : HabilitarService){
    this.Cilforms = this.fb.group({
      desc_cil: ['', Validators.required],
      PUESTO_TRABAJO: ['', Validators.required],
    })
     this.dataCil = data.element
    console.log(this.dataCil.id_cil)
    
  }

  close(){
    this.Cilforms.clearValidators(); // Limpiar validadores
    this.Cilforms.updateValueAndValidity();
    this.dialog.closeAll();
 }
   
  editForm() {
     if (this.Cilforms.valid){
      const DescCil = this.Cilforms.value.desc_cil
      const PuestoTrabajo = this.Cilforms.value.PUESTO_TRABAJO
      console.log(DescCil , PuestoTrabajo);
      this.dataCil.desc_cil = DescCil
      this.dataCil.PUESTO_TRABAJO = PuestoTrabajo
     
 
      this._habiliatarServices.cambiarEstatus('cil' , this.dataCil).subscribe(data=> {
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
      this.Cilforms.markAllAsTouched();
     }

  }


}
