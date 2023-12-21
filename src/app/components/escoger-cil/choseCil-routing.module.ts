import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EscogerCilComponent } from './escoger-cil.component';


const routes: Routes = [
    {
        path: 'chose-cil', component: EscogerCilComponent
    },
    { 
        path: '**' , redirectTo: 'chose-cil' , pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class choseCilRouter { }
