import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from './shared/shared.module';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { LoginService } from './services/login.service';

import { MatSidenavModule } from '@angular/material/sidenav';
import { EscogerCilComponent } from './components/escoger-cil/escoger-cil.component';

import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { TokenExpirationModalComponent } from './components/token-expiration-modal/token-expiration-modal.component';
import { ModalAuthService } from './services/modalAuth.service';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RecoverPasswordComponent,
    EscogerCilComponent,
    TokenExpirationModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    MatSidenavModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,  
    MatDialogModule
  ],
  providers: [
    LoginService,
    ModalAuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
