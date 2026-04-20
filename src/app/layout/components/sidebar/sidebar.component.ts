import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

interface NavItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  isCollapsed = false;

  navItems: NavItem[] = [
    { label: 'Dashboard', route: '/dashboard' },
    { label: 'Trámites', route: '/procedures' },
    { label: 'Flujos de Trabajo', route: '/policies' },
    { label: 'Departamentos', route: '/departments' },
    { label: 'Usuarios', route: '/users' },
    { label: 'Roles', route: '/roles' },
    { label: 'Notificaciones', route: '/notifications' },
  ];

  toggle() {
    this.isCollapsed = !this.isCollapsed;
  }
}
