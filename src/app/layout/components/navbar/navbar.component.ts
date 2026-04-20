import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  currentPage = 'Dashboard';

  private readonly pageNames: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/procedures': 'Trámites',
    '/policies': 'Flujos de Trabajo',
    '/departments': 'Departamentos',
    '/users': 'Usuarios',
    '/roles': 'Roles',
    '/notifications': 'Notificaciones',
  };

  constructor(private readonly router: Router) {}

  ngOnInit() {
    // Detectar la página actual al cargar
    this.updateTitle(this.router.url);

    // Detectar cambios de ruta
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updateTitle(event.urlAfterRedirects);
      });
  }

  private updateTitle(url: string) {
    const base = '/' + url.split('/')[1];
    // Si es el editor de flujos muestra título especial
    if (url.includes('/editor')) {
      this.currentPage = 'Editor de Flujo';
      return;
    }
    this.currentPage = this.pageNames[base] ?? 'GestiónFlow';
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/auth/login']);
  }
}
