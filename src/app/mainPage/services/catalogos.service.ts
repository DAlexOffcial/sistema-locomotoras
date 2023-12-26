import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Catalogos, Empleado} from '../interfaces/catalogos';
import { OperarioService } from 'src/app/services/Operario.service';
@Injectable({
  providedIn: 'root'
})
export class CatalogosService {
  constructor(private http: HttpClient , private _operarioService: OperarioService) { }

  //obtener catalogos 
  getDataCatalogos(catalogo: string): Observable<any> {
    const apiUrl = `/api/getCatalogData?catalog=${catalogo}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this.http.post<Catalogos>(apiUrl, null, { headers }).pipe(
      map(data => this.mapData(data, catalogo))
    );
  }
  
  private mapData(data: Catalogos, tipo: string): any {
    switch (tipo) {
      case 'cil':
        return data.Catalog.cil;
      case 'inspecciones':
        return data.Catalog.inspecciones
      case 'entregas':
        return data.Catalog.entregas
      case 'acciones':
        return data.Catalog.acciones
      case 'banios':
        return data.Catalog.banios
      case 'iniciales_locos':
        return data.Catalog.iniciales_locos
      case 'locomotoras':
        return data.Catalog.locomotoras
      case 'mantenedores':
        return data.Catalog.mantenedores
      case 'funciones':
        return data.Catalog.funciones
      // Agrega más casos según sea necesario para otros tipos de información
      default:
        throw new Error(`Tipo de catálogo no válido: ${tipo}`);
    }
  }

  // crearCatlogos 
  crearCatalogo(catalogo: string, element: any): Observable<string> {
    const body = this.getBodyCreate(catalogo, element)

    const apiUrl = '/api/saveCatalogData';
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });

    return this.http.post<string>(apiUrl, body, { headers })
  }

  private getBodyCreate(catalo: string, element: any): object {
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

  //editarCatlogos

  editarCatalogo(catalogo: string, element: any): Observable<string> {
    const body = this.getBodyEdit(catalogo, element)

    const apiUrl = '/api/saveCatalogData';
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });

    return this.http.post<string>(apiUrl, body, { headers })
  }

  private getBodyEdit(catalo: string, element: any): object {
    
    
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
              "Value": element.activo
            },
            {
              "Key": "PUESTO_TRABAJO",
              "Value": element.PUESTO_TRABAJO 
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

  //obtener empleado 
  getDataCatalogosEmpleado(): Observable<Catalogos> {
    const CIL = this._operarioService.decrypt( localStorage.getItem('CIL') ?? '')
    const apiUrl = `/api/getCatalogData?catalog=empleados&cil=${CIL}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });

    return this.http.post<Catalogos>(apiUrl, {}, { headers })
  }

  //editar empleado 
   
  editarEmpleado( element: Empleado): Observable<string> {
    
    const body = this.getBodyEditEmpleados(element)

    const CIL = this._operarioService.decrypt( localStorage.getItem('CIL') ?? '')
    const apiUrl = `/api/saveCatalogData?catalog=empleados&cil=${CIL}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });

    return this.http.post<string>(apiUrl, body, { headers })
  }

  private getBodyEditEmpleados(element : Empleado) : any{
    return {
      "Id": element.id_empleado,
      "Catalog": "empleados",
      "CatalogConcepts": [
        {
          "Key": "id_empleado",
          "Value": element.id_empleado
        },
        {
          "Key": "nombre_empl",
          "Value": element.nombre_empl
        },
        {
          "Key": "apellido_empl",
          "Value": element.apellido_empl
        },
        {
          "Key": "fk_funcion_empl",
          "Value": element.fk_funcion_empl
        },
        {
          "Key": "acceso_cil",
          "Value": element.acceso_cil
        },
        {
          "Key": "activo",
          "Value": element.activo 
        },
      ]
    };
  }

  //agregar empleados 

  agregarEmpleado( element: Empleado): Observable<string> {
    
    const body = this.getBodyAddEmpleados(element)

    const CIL = this._operarioService.decrypt( localStorage.getItem('CIL') ?? '')
    const apiUrl = `/api/saveCatalogData?catalog=empleados&cil=${CIL}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });

    return this.http.post<string>(apiUrl, body, { headers })
  }

  private getBodyAddEmpleados(element : Empleado) : object{
    return {
      "Id": "0",
      "Catalog": "empleados",
      "CatalogConcepts": [
        {
          "Key": "id_empleado",
          "Value": element.id_empleado
        },
        {
          "Key": "nombre_empl",
          "Value": element.nombre_empl
        },
        {
          "Key": "apellido_empl",
          "Value": element.apellido_empl
        },
        {
          "Key": "fk_funcion_empl",
          "Value": element.fk_funcion_empl
        },
        {
          "Key": "acceso_cil",
          "Value": element.acceso_cil 
        },
        {
          "Key": "activo",
          "Value": "0"
        },
      ]
    };
  }

}
