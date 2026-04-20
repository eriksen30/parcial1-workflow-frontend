import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

// TODO: Conectar con el backend cuando este disponible
@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }) {
    // return this.http.post('/api/auth/login', credentials);
  }

  logout() {
    this.isAuthenticated$.next(false);
  }

  get isLoggedIn() {
    return this.isAuthenticated$.asObservable();
  }
}
