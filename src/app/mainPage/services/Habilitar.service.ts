import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddModalMainPageComponent } from '../components/add-modal-main-page/add-modal-main-page.component';
import { MatDialog } from '@angular/material/dialog';
import { EditModalMainPageComponent } from '../components/edit-modal-main-page/edit-modal-main-page.component';

@Injectable({
  providedIn: 'root'
})
export class HabilitarService {

  constructor(private http : HttpClient  ,  private matDialog:MatDialog) { }
  

  cambiarEstatus(catalogo: string , element: any):Observable<any>{
    const body = this.getBody(catalogo  , element)

    const apiUrl = '/server/saveCatalogData';
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });

    return this.http.post<any>(apiUrl, body, { headers })
  }

  private getBody( catalo: string , element: any): any {
    switch (catalo) {
      case 'cil':
        console.log(element.id_cil);
        console.log(element.desc_cil);
        console.log(element.activo)
        console.log(element.PUESTO_TRABAJO);
        return {          
          "Id": element.id_cil,
          "Catalog": "cil",
          "CatalogConcepts": [
            {
              "Key": "id_cil",
              "Value": element.id_cil
            },
            {
              "Key": "desc_cil",
              "Value": element.desc_cil
            },
            {
              "Key": "activo",
              "Value": element.activo
            },
            {
              "Key": "PUESTO_TRABAJO",
              "Value": (element.PUESTO_TRABAJO == null) ? "null" : element.PUESTO_TRABAJO
            }
          ]
        };
      case 'inspecciones':
        return {
          "Id": element.id_tipo_inspeccion,
          "Catalog": "inspecciones",
          "CatalogConcepts": [
            {
              "Key": "id_tipo_inspeccion",
              "Value": element.id_tipo_inspeccion
            },
            {
              "Key": "tipo_inspeccion",
              "Value": element.tipo_inspeccion
            },
            {
              "Key": "desc_tipo_inspeccion",
              "Value": element.desc_tipo_inspeccion
            },
            {
              "Key": "tiempo_meta",
              "Value": element.tiempo_meta
            },
            {
              "Key": "activo",
              "Value": element.activo
            }
          ]
        };
        case 'entregas':
          return {
            "Id": element.id_tipo_entrega,
            "Catalog": "entregas",
            "CatalogConcepts": [
              {
                "Key": "id_tipo_entrega",
                "Value": element.id_tipo_entrega
              },
              {
                "Key": "desc_tipo_entrega",
                "Value": element.desc_tipo_entrega
              },
              {
                "Key": "activo",
                "Value": element.activo
              }
            ]
          };
      case 'acciones':
        return {
          "Id": element.id_accion,
          "Catalog": "acciones",
          "CatalogConcepts": [
            {
              "Key": "id_accion",
              "Value": element.id_accion
            },
            {
              "Key": "desc_accion",
              "Value": element.desc_accion
            },
            {
              "Key": "activo",
              "Value": element.activo
            }
          ]
        };

      case 'banios':
        return {
          "Id": element.id_banio,
          "Catalog": "banios",
          "CatalogConcepts": [
            {
              "Key": "id_banio",
              "Value": element.id_banio
            },
            {
              "Key": "desc_banio",
              "Value": element.desc_banio
            },
            {
              "Key": "activo",
              "Value": element.activo
            }
          ]
        };
      case 'iniciales_locos':
        return {
          "Id": element.id_inicial_loco,
          "Catalog": "iniciales_locos",
          "CatalogConcepts": [
            {
              "Key": "id_inicial_loco",
              "Value": element.id_inicial_loco
            },
            {
              "Key": "desc_inicial_loco",
              "Value": element.desc_inicial_loco
            },
            {
              "Key": "activo",
              "Value": element.activo
            }
          ]
        };
      case 'locomotoras':
        return {
          "Id": element.id_loco,
          "Catalog": "locomotoras",
          "CatalogConcepts": [
            {
              "Key": "id_loco",
              "Value": element.id_loco
            },
            {
              "Key": "desc_loco",
              "Value": element.desc_loco
            },
            {
              "Key": "fk_mantenedor",
              "Value": element.fk_mantenedor
            },
            {
              "Key": "activo",
              "Value": element.activo
            }
          ]
        };
      case 'mantenedores':
        return {
          "Id": element.id_mantenedor,
          "Catalog": "mantenedores",
          "CatalogConcepts": [
            {
              "Key": "id_mantenedor",
              "Value": element.id_mantenedor
            },
            {
              "Key": "desc_mantenedor",
              "Value": element.desc_mantenedor
            },
            {
              "Key": "activo",
              "Value": element.activo
            }
          ]
        };
      // Agrega más casos según sea necesario para otros tipos de información
      default:
        throw new Error(`Tipo de catálogo no válido: ${catalo}`);
    }
  }
    //modals
    openAddDialog() : void {
      this.matDialog.open(AddModalMainPageComponent , {
        width: '60%',
        height : '80%'
      })
    }

    openEditDialog() : void {
      this.matDialog.open(EditModalMainPageComponent, {
        width: '60%',
        height : '80%'
      })
    }
}
