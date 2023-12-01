import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Cil } from 'src/app/mainPage/interfaces/catalogos';
import { CreateService } from 'src/app/mainPage/services/Create.service';
import { HabilitarService } from 'src/app/mainPage/services/Habilitar.service';
import { TablasService } from 'src/app/mainPage/services/Tablas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-cil',
  templateUrl: './add-cil.component.html',
  styleUrls: ['./add-cil.component.css']
})
export class AddCilComponent {
  
  dataCil!: Cil

  Cilforms: FormGroup


  constructor(private dialog: MatDialog, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private _habiliatarServices: HabilitarService, private _createServices: CreateService, private _tableService : TablasService) {
    this.Cilforms = this.fb.group({
      id_cil:['', Validators.required],
      desc_cil: ['', Validators.required],
      PUESTO_TRABAJO: ['', Validators.required],
    })
    console.log(data.TipoBoton);

    this.dataCil = data.element
    console.log(this.dataCil.id_cil)

  }

  close() {
    this.Cilforms.clearValidators(); // Limpiar validadores
    this.Cilforms.updateValueAndValidity();
    this.dialog.closeAll();
  }

  editForm() {
    console.log(this.Cilforms.valid);
    if (this.Cilforms.valid) {
      const DescCil = this.Cilforms.value.desc_cil;
      const PuestoTrabajo = this.Cilforms.value.PUESTO_TRABAJO;
      const IdCil = this.Cilforms.value.id_cil;
      console.log(DescCil, PuestoTrabajo);
      this.dataCil.desc_cil = DescCil;
      this.dataCil.PUESTO_TRABAJO = PuestoTrabajo;
      this.dataCil.id_cil = IdCil;

      if (this.data.TipoBoton == 'add') {
        const IdCil = this.Cilforms.value.id_cil;
        console.log(IdCil);
          console.log(this.dataCil);
          this._createServices.cambiarEstatus('cil', this.dataCil).subscribe(data => {
            console.log(JSON.stringify(data));
            Swal.fire({
              title: "Registro agregado!",
              icon: "success"
            });
             // llamar a la tabla 
             this._tableService.TriggerTabla('cil')
            this.close();
          }, (error) => {
            console.log(error);
          });
      } else if (this.data.TipoBoton == 'edit') {
        this._habiliatarServices.cambiarEstatus('cil', this.dataCil).subscribe(data => {
          console.log(JSON.stringify(data));
          Swal.fire({
            title: "Registro editado!",
            icon: "success"
          });
          //llamar a la tabla 
          this._tableService.TriggerTabla('cil')
          this.close();
        }, (error) => {
          console.log(error);
        });
      } else {
        this.Cilforms.markAllAsTouched();
      }
    } else {
      this.Cilforms.markAllAsTouched();
    }
  }

}
