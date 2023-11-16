import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';

const routes: Routes = [
  { 
    path: '', redirectTo: 'login' , pathMatch: 'full' 
  },
  { 
    path: 'login' , component: LoginComponent 
  },
  { 
    path: 'dashboard' , component: DashboardComponent
  },
  { 
    path: 'recover' , component: RecoverPasswordComponent
  },
  { 
    path: 'dashboard' , loadChildren: () => import('./mainPage/mainPage.module').then(m => m.mainPageModule )
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
