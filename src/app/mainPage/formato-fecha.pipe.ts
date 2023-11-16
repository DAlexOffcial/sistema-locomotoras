import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoFecha'
})
export class FormatoFechaPipe implements PipeTransform {

  transform(value: Date | string | null, format: string = 'yyyy-MM-ddTHH:mm'): string {
    if (value === null) {
      return ''; // o cualquier otro valor predeterminado que desees para fechas nulas
    }

    const datePipe = new DatePipe('en-US');
    return datePipe.transform(value, format) || '';
  }

}
