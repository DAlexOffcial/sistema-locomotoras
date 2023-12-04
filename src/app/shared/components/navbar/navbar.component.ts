import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Output() sideNavToggled = new EventEmitter<boolean>()
  menuStatus:boolean = false

  sideNavToggle(){
    this.menuStatus = true
    this.sideNavToggled.emit(this.menuStatus)
  }
}
