import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  
  constructor(private router : Router) {}

  IrLick(route : string) : void {
    this.router.navigateByUrl('dashboard/dashboard/' + route)
  }
}
