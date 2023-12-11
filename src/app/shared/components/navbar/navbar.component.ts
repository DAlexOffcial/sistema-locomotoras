import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Output() sideNavToggled = new EventEmitter<boolean>()
  menuStatus:boolean = false

  constructor(private router :Router){}

  sideNavToggle(){
    this.menuStatus = true
    this.sideNavToggled.emit(this.menuStatus)
  }

  logOut(){
    localStorage.removeItem("token");
    localStorage.removeItem("NoEmpleado");
    localStorage.removeItem("CIL");
    localStorage.removeItem("CILES");
    this.router.navigate(['/login'])
  }

  SelectCil(){
    localStorage.removeItem("CIL");
    this.router.navigate(['/chose-cil'])
  }



}
