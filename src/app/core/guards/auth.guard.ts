import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  // TODO: reemplazar con verificación real del token JWT
  // cuando el backend Spring Boot esté listo
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (isLoggedIn) {
    return true;
  }

  router.navigate(['/auth/login']);
  return false;
};
