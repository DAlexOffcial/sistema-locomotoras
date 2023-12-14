import { inject } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { OperarioService } from '../services/Operario.service';

export const getDashboardAccessGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
   
  const _operarioService = inject(OperarioService)

  const currentUserRole = _operarioService.decrypt( localStorage.getItem('funcion') ?? '')

  if (['1', '2', '3'].includes(currentUserRole)) {
    
    return true;
  }
  alert('acceso denegado a operario')

  return false

};

