import { Routes } from '@angular/router';

export const POLICIES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/policies/policies.component').then(
        (m) => m.PoliciesComponent,
      ),
  },
  {
    path: ':id/editor',
    loadComponent: () =>
      import('./pages/workflow-editor/workflow-editor.component').then(
        (m) => m.WorkflowEditorComponent,
      ),
  },
];
