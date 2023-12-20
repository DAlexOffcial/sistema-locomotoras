import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';


export const isAuthenticatedGuard : CanActivateFn = (route, state) => {
    const _LoginService = inject( LoginService )
    const router = inject( Router )
    
    if (_LoginService.isAuthenticated()) {
      // Si el usuario está autenticado, permitir la navegación
      return true;
    } else {
      // Si el usuario no está autenticado, redirigir a la página de inicio de sesión
      router.navigate(['login'])
      // Puedes redirigir a la página de inicio de sesión o hacer cualquier otra lógica aquí.
      return false;
    }
};
