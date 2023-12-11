import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { EmpleadosService } from '../services/Empleados.service';
import { of, switchMap } from 'rxjs';

export const hasCilesGuard: CanActivateFn = (route, state) => {
  const _EmpleService = inject( EmpleadosService )
  const router = inject( Router )
  
  return _EmpleService.hasCiles().pipe(
    switchMap((hasCiles) => {
      if (hasCiles) {
        // Si el usuario tiene CILES, permitir la navegación
        return of(true);
      } else {
        // Si el usuario no tiene CILES, redirigir a la página de elección de CILES
        console.log('Usuario no tiene CILES. Redirigiendo a la página de elección de CILES.');
        router.navigate(['chose-cil']);
        return of(false);
      }
    })
  );
};
