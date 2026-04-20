import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  success: boolean;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // ── Métodos genéricos ────────────────────
  get<T>(endpoint: string, params?: Record<string, string>): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(
        ([k, v]) => (httpParams = httpParams.set(k, v)),
      );
    }
    return this.http
      .get<T>(`${this.baseUrl}/${endpoint}`, { params: httpParams })
      .pipe(catchError(this.handleError));
  }

  post<T>(endpoint: string, body: unknown): Observable<T> {
    return this.http
      .post<T>(`${this.baseUrl}/${endpoint}`, body)
      .pipe(catchError(this.handleError));
  }

  put<T>(endpoint: string, body: unknown): Observable<T> {
    return this.http
      .put<T>(`${this.baseUrl}/${endpoint}`, body)
      .pipe(catchError(this.handleError));
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http
      .delete<T>(`${this.baseUrl}/${endpoint}`)
      .pipe(catchError(this.handleError));
  }

  // ── Endpoints por módulo ─────────────────
  // Usuarios
  getUsers() {
    return this.get<ApiResponse<any[]>>('users');
  }
  getUserById(id: number) {
    return this.get<ApiResponse<any>>(`users/${id}`);
  }
  createUser(data: unknown) {
    return this.post<ApiResponse<any>>('users', data);
  }
  updateUser(id: number, data: unknown) {
    return this.put<ApiResponse<any>>(`users/${id}`, data);
  }
  deleteUser(id: number) {
    return this.delete<ApiResponse<any>>(`users/${id}`);
  }

  // Roles
  getRoles() {
    return this.get<ApiResponse<any[]>>('roles');
  }
  createRole(data: unknown) {
    return this.post<ApiResponse<any>>('roles', data);
  }
  updateRole(id: number, data: unknown) {
    return this.put<ApiResponse<any>>(`roles/${id}`, data);
  }
  deleteRole(id: number) {
    return this.delete<ApiResponse<any>>(`roles/${id}`);
  }

  // Departamentos
  getDepartments() {
    return this.get<ApiResponse<any[]>>('departments');
  }
  createDepartment(data: unknown) {
    return this.post<ApiResponse<any>>('departments', data);
  }
  updateDepartment(id: number, data: unknown) {
    return this.put<ApiResponse<any>>(`departments/${id}`, data);
  }
  deleteDepartment(id: number) {
    return this.delete<ApiResponse<any>>(`departments/${id}`);
  }

  // Trámites
  getTramites(params?: Record<string, string>) {
    return this.get<PaginatedResponse<any>>('tramites', params);
  }
  getTramiteById(id: number) {
    return this.get<ApiResponse<any>>(`tramites/${id}`);
  }
  createTramite(data: unknown) {
    return this.post<ApiResponse<any>>('tramites', data);
  }
  updateTramite(id: number, data: unknown) {
    return this.put<ApiResponse<any>>(`tramites/${id}`, data);
  }
  deleteTramite(id: number) {
    return this.delete<ApiResponse<any>>(`tramites/${id}`);
  }
  changeTramiteStatus(id: number, status: string) {
    return this.put<ApiResponse<any>>(`tramites/${id}/status`, { status });
  }

  // Políticas / Flujos
  getPolicies() {
    return this.get<ApiResponse<any[]>>('policies');
  }
  getPolicyById(id: number) {
    return this.get<ApiResponse<any>>(`policies/${id}`);
  }
  createPolicy(data: unknown) {
    return this.post<ApiResponse<any>>('policies', data);
  }
  updatePolicy(id: number, data: unknown) {
    return this.put<ApiResponse<any>>(`policies/${id}`, data);
  }
  deletePolicy(id: number) {
    return this.delete<ApiResponse<any>>(`policies/${id}`);
  }
  deployPolicy(id: number, xml: string) {
    return this.post<ApiResponse<any>>(`policies/${id}/deploy`, { xml });
  }

  // Notificaciones
  getNotifications() {
    return this.get<ApiResponse<any[]>>('notifications');
  }
  markNotificationRead(id: number) {
    return this.put<ApiResponse<any>>(`notifications/${id}/read`, {});
  }
  markAllNotificationsRead() {
    return this.put<ApiResponse<any>>('notifications/read-all', {});
  }

  // Auth
  login(credentials: { username: string; password: string }) {
    return this.post<ApiResponse<{ token: string; user: any }>>(
      'auth/login',
      credentials,
    );
  }
  getProfile() {
    return this.get<ApiResponse<any>>('auth/profile');
  }
  updateProfile(data: unknown) {
    return this.put<ApiResponse<any>>('auth/profile', data);
  }
  changePassword(data: unknown) {
    return this.put<ApiResponse<any>>('auth/password', data);
  }

  // ── Manejo de errores ────────────────────
  private handleError(error: any) {
    console.error('API Error:', error);
    const message =
      error?.error?.message ?? 'Error de conexión con el servidor';
    return throwError(() => new Error(message));
  }
}
