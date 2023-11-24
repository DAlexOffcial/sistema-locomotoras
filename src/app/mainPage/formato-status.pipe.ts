import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estado'
})
export class FormatoEstadoPipe implements PipeTransform {

  transform(value: string): string {
    if (value === '0') {
      return 'INACTIVO';
    } else if (value === '1') {
      return 'ACTIVO';
    } else {
      return value;
    }
  }
}
