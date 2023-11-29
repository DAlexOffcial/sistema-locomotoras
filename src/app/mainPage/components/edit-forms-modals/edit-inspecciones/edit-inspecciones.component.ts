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
      tipo_inspeccion: ['', [Validators.required , Validators.maxLength(3)]],
      desc_tipo_inspeccion: ['', Validators.required],
      tiempo_meta: ['', Validators.required],
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
      const TipoInspc = this.inspeccionesForm.value.tipo_inspeccion
      const DescTipoInsp = this.inspeccionesForm.value.desc_tipo_inspeccion
      const TiempoMeta = this.inspeccionesForm.value.tiempo_meta
     
     
      this.dataInspecciones.tipo_inspeccion = TipoInspc
      this.dataInspecciones.desc_tipo_inspeccion = DescTipoInsp
      this.dataInspecciones.tiempo_meta = TiempoMeta

      console.log(this.dataInspecciones.tipo_inspeccion , this.dataInspecciones.desc_tipo_inspeccion , this.dataInspecciones.tiempo_meta );
     
 
      this._habiliatarServices.cambiarEstatus('inspecciones' , this.dataInspecciones).subscribe(data=> {
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
