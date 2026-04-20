import { Routes } from '@angular/router';

export const PROCEDURES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/tramites/tramites.component').then(
        (m) => m.TramitesComponent,
      ),
  },
];
