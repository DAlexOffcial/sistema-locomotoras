import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cil } from 'src/app/mainPage/interfaces/catalogos';
import { CreateService } from 'src/app/mainPage/services/Create.service';
import { HabilitarService } from 'src/app/mainPage/services/edit.service';
import { TablasService } from 'src/app/mainPage/services/Tablas.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-cil',
  templateUrl: './edit-cil.component.html',
  styleUrls: ['./edit-cil.component.css']
})
export class EditCilComponent {

  dataCil!: Cil

  Cilforms: FormGroup


  constructor(private dialog: MatDialog, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private _habiliatarServices: HabilitarService, private _createServices: CreateService, private _tableService : TablasService) {
    this.Cilforms = this.fb.group({
      desc_cil: ['', Validators.required],
      PUESTO_TRABAJO: ['', Validators.required],
    })


    this.dataCil = data.element


  }

  close() {
    this.Cilforms.clearValidators(); // Limpiar validadores
    this.Cilforms.updateValueAndValidity();
    this.dialog.closeAll();
  }

  editForm() {
  
    if (this.Cilforms.valid) {
      const DescCil : string = this.Cilforms.value.desc_cil;
      const PuestoTrabajo :string = this.Cilforms.value.PUESTO_TRABAJO;

      this.dataCil.desc_cil = DescCil.toUpperCase();
      this.dataCil.PUESTO_TRABAJO = PuestoTrabajo.toUpperCase();

      if (this.data.TipoBoton == 'add') {
        const IdCil = this.Cilforms.value.id_cil;
   
        this.dataCil.id_cil = IdCil;

 
          this._createServices.cambiarEstatus('cil', this.dataCil).subscribe(data => {
            Swal.fire({
              title: "Registro editado!",
              icon: "success"
            });
             // llamar a la tabla 
             this._tableService.TriggerTabla('cil')
            this.close();
          }, (error) => {
            this._tableService.TriggerTabla('cil')

          });
      } else if (this.data.TipoBoton == 'edit') {
        this._habiliatarServices.cambiarEstatus('cil', this.dataCil).subscribe(data => {

          Swal.fire({
            title: "Registro editado!",
            icon: "success"
          });
          //llamar a la tabla 
          this._tableService.TriggerTabla('cil')
          this.close();
        }, (error) => {
          this._tableService.TriggerTabla('cil')
 
        });
      } else {
        this.Cilforms.markAllAsTouched();
      }
    } else {
      this.Cilforms.markAllAsTouched();
    }
  }

}

