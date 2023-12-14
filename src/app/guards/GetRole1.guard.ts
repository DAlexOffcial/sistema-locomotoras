import {  inject } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { EmpleadosService } from '../services/Empleados.service';

export const getDashboardAccessGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
    const router = inject(Router)
    const empleadosService = inject(EmpleadosService)

const currentUserRole =  localStorage.getItem('funcion') ?? ''

if (['1', '2', '3'].includes(currentUserRole)) {
      return true;
  }
  alert('acceso denegado a operario')
  return false

};