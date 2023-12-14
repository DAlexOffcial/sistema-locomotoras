import {  inject } from '@angular/core';
import { Router, CanActivateChildFn, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { EmpleadosService } from '../services/Empleados.service';

export const getRoleGuardDos: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
    const router = inject(Router)
    const empleadosService = inject(EmpleadosService)

  const currentUserRole = localStorage.getItem('funcion')
  console.log(currentUserRole);
  
  const allowedRoles = route.data?.['allowedRoles'] 
  
  if (allowedRoles.includes(currentUserRole)) {
      return true;
  }
  //router.createUrlTree(['/login'])

  if(currentUserRole === '2'){
    alert('acceso denegado a maestro')
  }
  if(currentUserRole === '3'){
    alert('acceso denegado a mayordomo')
  }

  return false
};