import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Catalogos } from '../interfaces/catalogos';

@Injectable({
  providedIn: 'root'
})
export class CreateService {

  constructor(private http: HttpClient) { }

  getCiles(): Observable<Catalogos> {
    const apiUrl = `/api/getCatalogData?catalog=cil`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });

    return this.http.post<Catalogos>(apiUrl, null, { headers })
  }

  cambiarEstatus(catalogo: string, element: any): Observable<string> {
    const body = this.getBody(catalogo, element)

    const apiUrl = '/api/saveCatalogData';
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });

    return this.http.post<string>(apiUrl, body, { headers })
  }

  private getBody(catalo: string, element: any): object {
    switch (catalo) {
      case 'cil':
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
              "Value": "0"
            },
            {
              "Key": "PUESTO_TRABAJO",
              "Value": element.PUESTO_TRABAJO 
            }
          ]
        };
      case 'inspecciones':
        return {
          "Id": "0",
          "Catalog": "inspecciones",
          "CatalogConcepts": [
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
              "Value": "0"
            }
          ]
        };
      case 'entregas':
        return {
          "Id": "0",
          "Catalog": "entregas",
          "CatalogConcepts": [
            {
              "Key": "desc_tipo_entrega",
              "Value": element.desc_tipo_entrega
            },
            {
              "Key": "activo",
              "Value": "0"
            }
          ]
        };
      case 'acciones':
        return {
          "Id": "0",
          "Catalog": "acciones",
          "CatalogConcepts": [
            {
              "Key": "desc_accion",
              "Value": element.desc_accion
            },
            {
              "Key": "activo",
              "Value": "0"
            }
          ]
        };

      case 'banios':
        return {
          "Id": "0",
          "Catalog": "banios",
          "CatalogConcepts": [
            {
              "Key": "desc_banio",
              "Value": element.desc_banio
            },
            {
              "Key": "activo",
              "Value": "0"
            }
          ]
        };
      case 'iniciales_locos':
        return {
          "Id": "0",
          "Catalog": "iniciales_locos",
          "CatalogConcepts": [
            {
              "Key": "desc_inicial_loco",
              "Value": element.desc_inicial_loco
            },
            {
              "Key": "activo",
              "Value": "0"
            }
          ]
        };
      case 'locomotoras':
        return {
          "Id": "0",
          "Catalog": "locomotoras",
          "CatalogConcepts": [
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
              "Value": "0"
            }
          ]
        };
      case 'mantenedores':
        return {
          "Id": "0",
          "Catalog": "mantenedores",
          "CatalogConcepts": [
            {
              "Key": "desc_mantenedor",
              "Value": element.desc_mantenedor
            },
            {
              "Key": "activo",
              "Value": "0"
            }
          ]
        };
      // Agrega más casos según sea necesario para otros tipos de información
      default:
        throw new Error(`Tipo de catálogo no válido: ${catalo}`);
    }
  }
  
  
}
