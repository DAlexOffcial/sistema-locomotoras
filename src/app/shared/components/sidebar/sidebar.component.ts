import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() sideNavStatus: boolean = false
  @Output() sideNavToggled = new EventEmitter<boolean>()
  menuStatus:boolean = false

  
  constructor(private router : Router) {}

  IrLick(route : string) : void {
    this.menuStatus = false
    this.sideNavToggled.emit(this.menuStatus)
    this.router.navigateByUrl('dashboard/dashboard/' + route)
  }


}
