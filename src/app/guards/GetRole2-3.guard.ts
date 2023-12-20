import { inject } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { OperarioService } from '../services/Operario.service';
import Swal from 'sweetalert2';

export const getRoleGuardDos: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  
  const _operarioService = inject(OperarioService)

  const currentUserRole = _operarioService.decrypt(localStorage.getItem('funcion') ?? '')

  const allowedRoles = route.data?.['allowedRoles']

  if (allowedRoles.includes(currentUserRole)) {
    return true;
  }
  //router.createUrlTree(['/login'])

  if (currentUserRole === '2') {
    Swal.fire({
      icon: "error",
      title: "Acceso denegado a maestro",
    });
  }

  return false
};