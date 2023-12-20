import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { OperarioService } from 'src/app/services/Operario.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() sideNavStatus: boolean = false
  @Output() sideNavToggled = new EventEmitter<boolean>()
  menuStatus:boolean = false

  funsion: string = ''
  constructor(private router : Router, private _operarioService :OperarioService) {

    this.funsion = _operarioService.decrypt( localStorage.getItem('funcion') ?? '')
  }
   

  
  IrLick(route : string) : void {
    this.menuStatus = false
    this.sideNavToggled.emit(this.menuStatus)
    this.router.navigateByUrl('dashboard/dashboard/' + route)
  }


}
