
import { RouterStateSnapshot, ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import Swal from 'sweetalert2';

export const hasCiles: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {

    if (localStorage.getItem('CIL') && localStorage.getItem('CILES')) {
        return true;
    } else {
        Swal.fire({
            icon: "error",
            title: "Acceso denegado",
        });
    }

    return false
};