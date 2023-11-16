import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AddTableComponent } from './components/add-table/add-table.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
     NavbarComponent,
     SidebarComponent,
     AddTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    AddTableComponent
  ]
})
export class SharedModule { }
