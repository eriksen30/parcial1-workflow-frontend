import { Routes } from '@angular/router';

export const ROLES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/roles/roles.component').then((m) => m.RolesComponent),
  },
];
