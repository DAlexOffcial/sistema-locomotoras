import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck } from '@angular/core';
import { Catalog, Cil } from '../../interfaces/catalogos-cil';
import { CatalogosService } from '../../services/catalogos.service';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-catalogo-cli',
  templateUrl: './catalogo-cli.component.html',
  styleUrls: ['./catalogo-cli.component.css']
})
export class CatalogoCliComponent {
   CatalogoCLI: Cil[] =[];
   public t:number =0;
 
  constructor(private _catalogosServices: CatalogosService) {
       
     this.CatalogoCLI = _catalogosServices.data

    //this.showData()
  }

  /*showData(){
    console.log('estoy funcionando')
    this._catalogosServices.getDataCatalogCil().subscribe(data => {
      this.CatalogoCLI = data
      console.log(thiss.CatalogoCLI)
    })
  }*/
 

  /*showData(){
      this.CatalogoCLI = this._catalogosServices.data
      console.log(JSON.stringify(this._catalogosServices.data))
  }*/

}
