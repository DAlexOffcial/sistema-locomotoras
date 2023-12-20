import { inject } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { OperarioService } from '../services/Operario.service';
import Swal from 'sweetalert2';

export const getDashboardAccessGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
   
  const _operarioService = inject(OperarioService)

  const currentUserRole = _operarioService.decrypt( localStorage.getItem('funcion') ?? '')

  if (['1', '2'].includes(currentUserRole)) {
    
    return true;
  }
  if (currentUserRole === '3') {
    Swal.fire({
      icon: "error",
      title: "Acceso denegado a mayordomo",
    });
  }
  if (currentUserRole === '4') {
    Swal.fire({
      icon: "error",
      title: "Acceso denegado a operario",
    });
  }

  return false

};

