import { Empleado, Funcione } from "./catalogos";

export interface EmpleadoConFuncion extends Empleado {
    funcion: Funcione;
}