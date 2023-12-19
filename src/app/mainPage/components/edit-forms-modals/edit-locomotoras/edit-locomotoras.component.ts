import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Locomotora } from 'src/app/mainPage/interfaces/catalogos';
import { CreateService } from 'src/app/mainPage/services/Create.service';
import { HabilitarService } from 'src/app/mainPage/services/edit.service';
import { TablasService } from 'src/app/mainPage/services/Tablas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-locomotoras',
  templateUrl: './edit-locomotoras.component.html',
  styleUrls: ['./edit-locomotoras.component.css']
})
export class EditLocomotorasComponent {

  dataLocomotora!: Locomotora

  Locomotoraforms: FormGroup

  SeleccionarMantenedor: string = 'FXE,ALSTOM,PROGRESS RAIL,WABTEC,FSRR'

  valorConvertido: number = 0

  constructor(private dialog: MatDialog, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private _habiliatarServices: HabilitarService, private _createServices: CreateService, private _tablaService: TablasService) {
    this.Locomotoraforms = this.fb.group({
      desc_loco: ['', [Validators.required, Validators.maxLength(9)]],
      fk_mantenedor: ['', [Validators.required]],
    })
    this.dataLocomotora = data.element
    console.log(this.dataLocomotora.id_loco)
  }

  close() {
    this.Locomotoraforms.clearValidators(); // Limpiar validadores
    this.Locomotoraforms.updateValueAndValidity();
    this.dialog.closeAll();
  }

  editForm() {
    if (this.Locomotoraforms.valid) {
      const DescLoco: string = this.Locomotoraforms.value.desc_loco;
      console.log(this.Locomotoraforms.value.fk_mantenedor);

      switch (this.Locomotoraforms.value.fk_mantenedor.trim().toUpperCase()) {
        case 'FXE':
          this.valorConvertido = 1;
          break;
        case 'ALSTOM':
          this.valorConvertido = 2;
          break;
        case 'PROGRESS RAIL':
          this.valorConvertido = 3;
          break;
        case 'WABTEC':
          this.valorConvertido = 4;
          break;
        case 'FSRR':
          this.valorConvertido = 5;
          break;
        default:
          console.log('Valor no reconocido:', this.Locomotoraforms.value.fk_mantenedor.trim().toUpperCase());
          // Puedes agregar más información de depuración si es necesario
          break;
      }
      const FK_Mantenedor: number = this.valorConvertido
      console.log(DescLoco, FK_Mantenedor);
      this.dataLocomotora.desc_loco = DescLoco;
      this.dataLocomotora.fk_mantenedor = FK_Mantenedor;

      if (this.data.TipoBoton == 'add') {
        console.log(this.dataLocomotora);
        this._createServices.cambiarEstatus('locomotoras', this.dataLocomotora).subscribe(
          (data) => {
            console.log(JSON.stringify(data));
            Swal.fire({
              title: 'Registro agregadowww!',
              icon: 'success',
            });
            this._tablaService.TriggerTabla('locomotoras');
            this.close();
          },
          (error) => {
            console.log(error);
          }
        );
      } else if (this.data.TipoBoton == 'edit') {
        this._habiliatarServices.cambiarEstatus('locomotoras', this.dataLocomotora).subscribe(
          (data) => {
            console.log(JSON.stringify(data));
            Swal.fire({
              title: 'Registro editado!',
              icon: 'success',
            });
            this._tablaService.TriggerTabla('locomotoras');
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
      this.Locomotoraforms.markAllAsTouched();
    }
  }

}
