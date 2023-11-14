import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

import { CatalogoCliComponent } from './pages/catalogo-cil/catalogo-cli.component';
import { CatalogoInspeccionesComponent } from './pages/catalogo-inspecciones/catalogo-inspecciones.component';
import { CatalogoEntregasComponent } from './pages/catalogo-entregas/catalogo-entregas.component';
import { CatalogoAccionesComponent } from './pages/catalogo-acciones/catalogo-acciones.component';
import { CatalogoBaniosComponent } from './pages/catalogo-banios/catalogo-banios.component';
import { CatalogoEmpleadosComponent } from './pages/catalogo-empleados/catalogo-empleados.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children:[
            {
                path: 'cil', component: CatalogoCliComponent 
            },
            {
                path: 'inspecciones', component: CatalogoInspeccionesComponent 
            },
            {
                path: 'entregas', component: CatalogoEntregasComponent
            },
            {
                path: 'acciones', component: CatalogoAccionesComponent
            },
            {
                path: 'banios', component: CatalogoBaniosComponent
            },
            {
                path: 'empleados', component: CatalogoEmpleadosComponent 
            },
            {
                path: '**',
                redirectTo: 'cli'
            }
        ]
    },
    
     
]

@NgModule({
    imports: [
        RouterModule.forChild( routes )
    ],
    exports: [
        RouterModule
    ],
})
export class mainPageRoutingModule { }
