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

import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { FormatoFechaPipe } from './formato-fecha.pipe';
import { TablaMainPageComponent } from './components/tabla-main-page/tabla-main-page.component';
import { AddModalMainPageComponent } from './components/add-modal-main-page/add-modal-main-page.component';
import { CatalogosService } from './services/catalogos.service';
import { CatalogoInicialesLocosComponent } from './pages/catalogo-iniciales-locos/catalogo-iniciales-locos.component';
import { CatalogoLocomotorasComponent } from './pages/catalogo-locomotoras/catalogo-locomotoras.component';
import { CatalogoMantenedoresComponent } from './pages/catalogo-mantenedores/catalogo-mantenedores.component';
import { FormatoEstadoPipe } from './formato-status.pipe';





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
        MatInputModule
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
      TablaMainPageComponent,
      AddModalMainPageComponent,
      CatalogoInicialesLocosComponent,
      CatalogoLocomotorasComponent,
      CatalogoMantenedoresComponent,

    ],
    providers: [
      CatalogosService
    ]
})
export class mainPageModule { }
