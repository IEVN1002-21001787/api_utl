import { Routes } from "@angular/router";
import ZodiacoComponent from './zodiaco/zodiaco.component';
import Ejemplo1Component from "./ejemplo1/ejemplo1.component";
import EmpleadosComponent from './empleados/empleados.component';

// Si estás exportando el componente con un export por nombre, como es habitual en Angular
export default [
  {
    path: 'zodiaco',
    loadComponent: () => import('./zodiaco/zodiaco.component'),
  },
  {
    path: 'ejemplo1',
    loadComponent: () => import('./ejemplo1/ejemplo1.component'),
  },
  {
    path: 'empleados',
    loadComponent: () => import('./empleados/empleados.component'),
  },
] as Routes;
