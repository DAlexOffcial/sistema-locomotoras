import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'roles'
})
export class FormatoRolesPipe implements PipeTransform {

    transform(opcion: number): string {
        switch (opcion) {
            case 1:
                return 'SUPERVISOR';
            case 2:
                return 'MAESTRO';
            case 3:
                return 'MAYORDOMO';
            case 4:
                return 'OPERARIO';
            default:
                return 'Opción no válida';
        }
    }
}
