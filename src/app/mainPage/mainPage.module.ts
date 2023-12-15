import { NgModule } from '@angular/core';

import { CatalogoCliComponent } from './pages/catalogo-cil/catalogo-cli.component';
import { CatalogoInspeccionesComponent } from './pages/catalogo-inspecciones/catalogo-inspecciones.component';
import { CatalogoEntregasComponent } from './pages/catalogo-entregas/catalogo-entregas.component';
import { CatalogoAccionesComponent } from './pages/catalogo-acciones/catalogo-acciones.component';
import { CatalogoBaniosComponent } from './pages/catalogo-banios/catalogo-banios.component';
import { CatalogoEmpleadosComponent } from './pages/catalogo-empleados/catalogo-empleados.component';

import { CommonModule } from '@angular/common';
import { mainPageRoutingModule } from './mainPage-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { FormatoFechaPipe } from './formato-fecha.pipe';
import { CatalogosService } from './services/catalogos.service';
import { CatalogoInicialesLocosComponent } from './pages/catalogo-iniciales-locos/catalogo-iniciales-locos.component';
import { CatalogoLocomotorasComponent } from './pages/catalogo-locomotoras/catalogo-locomotoras.component';
import { CatalogoMantenedoresComponent } from './pages/catalogo-mantenedores/catalogo-mantenedores.component';
import { FormatoEstadoPipe } from './formato-status.pipe';
import { HabilitarService } from './services/edit.service';
import { EditCilComponent } from './components/edit-forms-modals/edit-cil/edit-cil.component';
import { EditInspeccionesComponent } from './components/edit-forms-modals/edit-inspecciones/edit-inspecciones.component';
import { EditEntregasComponent } from './components/edit-forms-modals/edit-entregas/edit-entregas.component';
import { EditAccionesComponent } from './components/edit-forms-modals/edit-acciones/edit-acciones.component';
import { EditBaniosComponent } from './components/edit-forms-modals/edit-banios/edit-banios.component';
import { EditEmpleadosComponent } from './components/edit-forms-modals/edit-empleados/edit-empleados.component';
import { EditInicialesLocosComponent } from './components/edit-forms-modals/edit-iniciales-locos/edit-iniciales-locos.component';
import { EditLocomotorasComponent } from './components/edit-forms-modals/edit-locomotoras/edit-locomotoras.component';
import { EditMantenedoresComponent } from './components/edit-forms-modals/edit-mantenedores/edit-mantenedores.component';
import { AddCilComponent } from './components/edit-forms-modals/add-cil/add-cil.component';
import { AddEmpleadosComponent } from './components/edit-forms-modals/add-empleados/add-empleados.component';
import { PasswordEmpleadosComponent } from './components/edit-forms-modals/password-empleados/password-empleados.component';

@NgModule({
    imports: [
        CommonModule,
        mainPageRoutingModule,
        SharedModule,
        HttpClientModule,
        MatPaginatorModule,
        MatTableModule,
        MatDialogModule,
        MatIconModule,
        MatTooltipModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        FormsModule,
        MatSelectModule
    ],
    exports: [

    ],
    declarations: [
      CatalogoCliComponent,
      CatalogoInspeccionesComponent,
      CatalogoEntregasComponent,
      CatalogoAccionesComponent,
      CatalogoBaniosComponent,
      CatalogoEmpleadosComponent,
      FormatoFechaPipe,
      FormatoEstadoPipe,
      CatalogoInicialesLocosComponent,
      CatalogoLocomotorasComponent,
      CatalogoMantenedoresComponent,
      EditCilComponent,
      EditInspeccionesComponent,
      EditEntregasComponent,
      EditAccionesComponent,
      EditBaniosComponent,
      EditEmpleadosComponent,
      EditInicialesLocosComponent,
      EditLocomotorasComponent,
      EditMantenedoresComponent,
      AddCilComponent,
      AddEmpleadosComponent,
      PasswordEmpleadosComponent   
    ],
    providers: [
      CatalogosService,
      HabilitarService,
    ]
})
export class mainPageModule { }
