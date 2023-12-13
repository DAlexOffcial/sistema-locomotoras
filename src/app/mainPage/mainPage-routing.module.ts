import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

import { CatalogoCliComponent } from './pages/catalogo-cil/catalogo-cli.component';
import { CatalogoInspeccionesComponent } from './pages/catalogo-inspecciones/catalogo-inspecciones.component';
import { CatalogoEntregasComponent } from './pages/catalogo-entregas/catalogo-entregas.component';
import { CatalogoAccionesComponent } from './pages/catalogo-acciones/catalogo-acciones.component';
import { CatalogoBaniosComponent } from './pages/catalogo-banios/catalogo-banios.component';
import { CatalogoEmpleadosComponent } from './pages/catalogo-empleados/catalogo-empleados.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { CatalogoInicialesLocosComponent } from './pages/catalogo-iniciales-locos/catalogo-iniciales-locos.component';
import { CatalogoLocomotorasComponent } from './pages/catalogo-locomotoras/catalogo-locomotoras.component';
import { CatalogoMantenedoresComponent } from './pages/catalogo-mantenedores/catalogo-mantenedores.component';

import { getRoleGuardDos } from '../guards/GetRole2-3.guard';
import { getDashboardAccessGuard } from '../guards/GetRole1.guard';



const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [getDashboardAccessGuard],
        children:[
            {
                path: 'cil', component: CatalogoCliComponent,
                canActivate:[getRoleGuardDos],
                data:{
                    allowedRoles: [1]
                },

            },
            {
                path: 'inspecciones', component: CatalogoInspeccionesComponent ,
                canActivate:[getRoleGuardDos],
                data:{
                    allowedRoles: [1]
                },
            },
            {
                path: 'entregas', component: CatalogoEntregasComponent,
                canActivate:[getRoleGuardDos],
                data:{
                    allowedRoles: [1]
                },
    
            },
            {
                path: 'acciones', component: CatalogoAccionesComponent,
                canActivate:[getRoleGuardDos],
                data:{
                    allowedRoles: [1]
                },
  
            },
            {
                path: 'banios', component: CatalogoBaniosComponent,
                canActivate:[getRoleGuardDos],
                data:{
                    allowedRoles: [1]
                },

            },
            {
                path: 'empleados', component: CatalogoEmpleadosComponent ,
               canActivate:[getRoleGuardDos],
                data:{
                  allowedRoles: [1 , 2 , 3]
                },
            },
            {
                path: 'iniciales-locos', component: CatalogoInicialesLocosComponent,
                canActivate:[getRoleGuardDos],
                data:{
                    allowedRoles: [1]
                },
            },
            {
                path: 'locomotoras', component: CatalogoLocomotorasComponent,
                canActivate:[getRoleGuardDos],
                data:{
                  allowedRoles: [1 , 2 , 3]
                },
            },
            {
                path: 'mantenedores', component: CatalogoMantenedoresComponent,
                canActivate:[getRoleGuardDos],
                data:{
                    allowedRoles: [1]
                },

            },
            { 
                path: '**' , redirectTo: 'empleados' , pathMatch: 'full'
            }

        ]
    },  
    { 
        path: '**' , redirectTo: 'dashboard' , pathMatch: 'full'
    }
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
