import { inject } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { OperarioService } from '../services/Operario.service';

export const getRoleGuardDos: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  
  const _operarioService = inject(OperarioService)

  const currentUserRole = _operarioService.decrypt(localStorage.getItem('funcion') ?? '')
  console.log(currentUserRole);

  const allowedRoles = route.data?.['allowedRoles']

  if (allowedRoles.includes(currentUserRole)) {
    return true;
  }
  //router.createUrlTree(['/login'])

  if (currentUserRole === '2') {
    alert('acceso denegado a maestro')
  }
  if (currentUserRole === '3') {
    alert('acceso denegado a mayordomo')
  }

  return false
};