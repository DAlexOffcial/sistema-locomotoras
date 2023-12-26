import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { isAuthenticatedGuard } from './guards/login.guard.guard';
import { getDashboardAccessGuard } from './guards/GetRole1.guard';
import { hasCiles } from './guards/HasCiles.guard';

const routes: Routes = [
  { 
    path: '', redirectTo: 'login' , pathMatch: 'full' 
  },
  { 
    path: 'login' , component: LoginComponent 
  },
  { 
    path: 'chose-cil' , 
    loadChildren:() => import('./components/escoger-cil/escojer-cil.module').then(m => m.choseCilModule),
    canActivate: [isAuthenticatedGuard , getDashboardAccessGuard]
  },
  { 
    path: 'dashboard' , 
    loadChildren: () => import('./mainPage/mainPage.module').then(m => m.mainPageModule ) ,
    canActivate: [isAuthenticatedGuard , hasCiles]
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
