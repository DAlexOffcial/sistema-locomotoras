import {  inject } from '@angular/core';
import { Router, CanActivateChildFn, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { EmpleadosService } from '../services/Empleados.service';

export const getRoleGuardDos: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
    const router = inject(Router)
    const empleadosService = inject(EmpleadosService)

  const currentUserRole = empleadosService.getFuncion()
  console.log(currentUserRole);
  
  const allowedRoles = route.data?.['allowedRoles'] 
  
  if (allowedRoles.includes(currentUserRole)) {
      return true;
  }
  //router.createUrlTree(['/login'])


  return false


};