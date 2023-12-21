import { NgModule } from '@angular/core';

import { EscogerCilComponent } from './escoger-cil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { LoginService } from 'src/app/services/login.service';
import { ModalAuthService } from 'src/app/services/modalAuth.service';
import { choseCilRouter } from './choseCil-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    EscogerCilComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    choseCilRouter,
    HttpClientModule
  ],
  exports: [
   EscogerCilComponent
  ],
  providers: [
    LoginService,
    ModalAuthService
  ]
})
export class choseCilModule { }
