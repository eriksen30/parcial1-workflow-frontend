import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated$ = new BehaviorSubject<boolean>(
    localStorage.getItem('isLoggedIn') === 'true',
  );

  constructor(
    private api: ApiService,
    private router: Router,
  ) {}

  login(credentials: { username: string; password: string }) {
    // Modo demo sin backend
    if (credentials.username === 'admin' && credentials.password === '1234') {
      localStorage.setItem('isLoggedIn', 'true');
      this.isAuthenticated$.next(true);
      this.router.navigate(['/dashboard']);
      return;
    }

    // TODO: descomentar cuando Spring Boot esté listo
    // this.api.login(credentials).pipe(
    //   tap(response => {
    //     localStorage.setItem('token', response.data.token);
    //     localStorage.setItem('isLoggedIn', 'true');
    //     this.isAuthenticated$.next(true);
    //     this.router.navigate(['/dashboard']);
    //   })
    // ).subscribe();
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    this.isAuthenticated$.next(false);
    this.router.navigate(['/auth/login']);
  }

  get isLoggedIn() {
    return this.isAuthenticated$.asObservable();
  }
}
