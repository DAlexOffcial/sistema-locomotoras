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
import { FormatoFechaPipe } from './formato-fecha.pipe';


@NgModule({
    imports: [
        CommonModule,
        mainPageRoutingModule,
        SharedModule,
        HttpClientModule,
        MatPaginatorModule,
        MatTableModule
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
    ],
})
export class mainPageModule { }
