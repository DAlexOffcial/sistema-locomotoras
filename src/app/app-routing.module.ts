import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { EscogerCilComponent } from './components/escoger-cil/escoger-cil.component';
import { isAuthenticatedGuard } from './guards/login.guard.guard';
import { hasCilesGuard } from './guards/HasCiles.guard';
import { getRoleGuardDos } from './guards/GetRole2-3.guard';

const routes: Routes = [
  { 
    path: '', redirectTo: 'login' , pathMatch: 'full' 
  },
  { 
    path: 'login' , component: LoginComponent 
  },
  { 
    path: 'recover' , component: RecoverPasswordComponent
  },
  { 
    path: 'chose-cil' , component: EscogerCilComponent,
    canActivate: [isAuthenticatedGuard]
  },
  { 
    path: 'dashboard' , 
    loadChildren: () => import('./mainPage/mainPage.module').then(m => m.mainPageModule ) ,
    canActivate: [isAuthenticatedGuard]
  },
  { 
    path: '**' , redirectTo: 'login' , pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
