import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Locomotora, Mantenedore } from 'src/app/mainPage/interfaces/catalogos';
import { CatalogosService } from 'src/app/mainPage/services/catalogos.service';
import { HabilitarService } from 'src/app/mainPage/services/edit.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-locomotoras',
  templateUrl: './edit-locomotoras.component.html',
  styleUrls: ['./edit-locomotoras.component.css']
})
export class EditLocomotorasComponent {

  dataLocomotora!: Locomotora

  Locomotoraforms: FormGroup

  SeleccionarMantenedor: string = ''

  valorConvertido: number = 0

  mantenedores: Mantenedore[] = []

  constructor(private dialog: MatDialog, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private _habiliatarServices: HabilitarService, private _catalogosService: CatalogosService) {
    this.Locomotoraforms = this.fb.group({
      desc_loco: ['', [Validators.required, Validators.maxLength(9)]],
      fk_mantenedor: ['', [Validators.required]],
    })
    _catalogosService.getDataCatalogos('mantenedores').subscribe(data => {
      this.mantenedores = data;
      const seleccionarMantenedor = this.mantenedores.map(m => m.desc_mantenedor).join(',');
      this.SeleccionarMantenedor = seleccionarMantenedor;
    })

    this.dataLocomotora = data.element

  }

  close() {
    this.Locomotoraforms.clearValidators(); // Limpiar validadores
    this.Locomotoraforms.updateValueAndValidity();
    this.dialog.closeAll();
  }

  editForm() {
    if (this.Locomotoraforms.valid) {
      const DescLoco: string = this.Locomotoraforms.value.desc_loco;
      const mantenedor = this.mantenedores.find(m => m.desc_mantenedor.trim().toUpperCase() === this.Locomotoraforms.value.fk_mantenedor.trim().toUpperCase());
      if (mantenedor) {
        this.valorConvertido = mantenedor.id_mantenedor;
      } 
      const FK_Mantenedor: number = this.valorConvertido
      this.dataLocomotora.desc_loco = DescLoco;
      this.dataLocomotora.fk_mantenedor = FK_Mantenedor;

      if (this.data.TipoBoton == 'add') {
        
        this._catalogosService.crearCatalogo('locomotoras', this.dataLocomotora).subscribe(
          (data) => {

            Swal.fire({
              title: 'Registro agregadowww!',
              icon: 'success',
            });
            this._habiliatarServices.TriggerTabla('locomotoras');
            this.close();
          },
          (error) => {
            this._habiliatarServices.TriggerTabla('locomotoras');
    
          }
        );
      } else {
        this.Locomotoraforms.markAllAsTouched();
      }
    } else if (this.data.TipoBoton == 'edit') {
      const DescLoco: string = this.Locomotoraforms.value.desc_loco;
      const mantenedor = this.mantenedores.find(m => m.desc_mantenedor.trim().toUpperCase() === this.Locomotoraforms.value.fk_mantenedor.trim().toUpperCase());
      if (mantenedor) {
        this.valorConvertido = mantenedor.id_mantenedor;
      } 
      const FK_Mantenedor: number = this.valorConvertido

      if(DescLoco === ''){
      this.dataLocomotora.desc_loco
      }else{
      this.dataLocomotora.desc_loco = DescLoco;
      }

      if(!FK_Mantenedor){
        this.dataLocomotora.fk_mantenedor
      }else{
      this.dataLocomotora.fk_mantenedor = FK_Mantenedor;
      }

      this._catalogosService.editarCatalogo('locomotoras', this.dataLocomotora).subscribe(
        (data) => {

          Swal.fire({
            title: 'Registro editado!',
            icon: 'success',
          });
          this._habiliatarServices.TriggerTabla('locomotoras');
          this.close();
        },
        (error) => {
          this._habiliatarServices.TriggerTabla('locomotoras');

        }
      );
    }
  }

}
