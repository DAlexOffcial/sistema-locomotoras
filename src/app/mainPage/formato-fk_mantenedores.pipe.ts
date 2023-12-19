import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'fk_mantenedores'
})
export class FormatoFK_mantenedoresPipe implements PipeTransform {

    transform(opcion: number): string {
        switch (opcion) {
            case 1:
                return 'FXE';
            case 2:
                return 'ALSTOM';
            case 3:
                return 'PROGRESS RAIL';
            case 4:
                return 'WABTEC';
            case 5:
                return 'FSRR';
            default:
                return 'Opción no válida';
        }
    }
}
