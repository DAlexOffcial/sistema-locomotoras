import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Inspecciones } from 'src/app/mainPage/interfaces/catalogos-cil';
import { HabilitarService } from 'src/app/mainPage/services/Habilitar.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-inspecciones',
  templateUrl: './edit-inspecciones.component.html',
  styleUrls: ['./edit-inspecciones.component.css']
})
export class EditInspeccionesComponent {

  dataInspecciones!: Inspecciones
  
  inspeccionesForm: FormGroup

  constructor(private dialog: MatDialog , private fb: FormBuilder , @Inject(MAT_DIALOG_DATA) public data: any , private _habiliatarServices : HabilitarService){
    this.inspeccionesForm = this.fb.group({
      desc_cil: ['', Validators.required],
      PUESTO_TRABAJO: ['', Validators.required],
    })
     this.dataInspecciones = data.element
    console.log(this.dataInspecciones.id_tipo_inspeccion)
    
  }

  close(){
    this.inspeccionesForm.clearValidators(); // Limpiar validadores
    this.inspeccionesForm.updateValueAndValidity();
    this.dialog.closeAll();
 }
   
  editForm() {
     if (this.inspeccionesForm.valid){
      const DescCil = this.inspeccionesForm.value.desc_cil
      const PuestoTrabajo = this.inspeccionesForm.value.PUESTO_TRABAJO
      console.log(DescCil , PuestoTrabajo);
      this.dataInspecciones.id_tipo_inspeccion = DescCil
      this.dataInspecciones.desc_tipo_inspeccion = PuestoTrabajo
     
 
      this._habiliatarServices.cambiarEstatus('cil' , this.dataInspecciones).subscribe(data=> {
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
      this.inspeccionesForm.markAllAsTouched();
     }
    }

}
