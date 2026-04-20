import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface StatCard {
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
  color: string;
  bg: string;
  icon: string;
}

interface RecentActivity {
  user: string;
  action: string;
  module: string;
  time: string;
  status: 'completado' | 'pendiente' | 'en progreso' | 'rechazado';
}

interface QuickAction {
  label: string;
  description: string;
  icon: string;
  route: string;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(private router: Router) {}

  stats: StatCard[] = [
    {
      label: 'Trámites Pendientes',
      value: '24',
      trend: '+3 hoy',
      trendUp: false,
      color: '#d97706',
      bg: '#fffbeb',
      icon: '⏳',
    },
    {
      label: 'En Proceso',
      value: '12',
      trend: '+2 esta semana',
      trendUp: true,
      color: '#2563eb',
      bg: '#eff6ff',
      icon: '🔄',
    },
    {
      label: 'Completados',
      value: '156',
      trend: '+8 vs ayer',
      trendUp: true,
      color: '#16a34a',
      bg: '#f0fdf4',
      icon: '✅',
    },
    {
      label: 'Rechazados',
      value: '8',
      trend: '-2 vs ayer',
      trendUp: false,
      color: '#dc2626',
      bg: '#fef2f2',
      icon: '❌',
    },
  ];

  quickActions: QuickAction[] = [
    {
      label: 'Nuevo Trámite',
      description: 'Iniciar un nuevo proceso',
      icon: '➕',
      route: '/procedures',
      color: '#2563eb',
    },
    {
      label: 'Ver Pendientes',
      description: 'Trámites sin resolver',
      icon: '⏳',
      route: '/procedures',
      color: '#d97706',
    },
    {
      label: 'Gestionar Flujos',
      description: 'Editor de workflows',
      icon: '🔀',
      route: '/policies',
      color: '#7c3aed',
    },
    {
      label: 'Administrar Usuarios',
      description: 'Roles y permisos',
      icon: '👥',
      route: '/users',
      color: '#0891b2',
    },
  ];

  recentActivity: RecentActivity[] = [
    {
      user: 'Erik Sensano',
      action: 'Creó un nuevo trámite',
      module: 'Trámites',
      time: 'Hace 5 min',
      status: 'en progreso',
    },
    {
      user: 'María López',
      action: 'Aprobó solicitud de licencia',
      module: 'Workflows',
      time: 'Hace 18 min',
      status: 'completado',
    },
    {
      user: 'Carlos Méndez',
      action: 'Registró nuevo departamento',
      module: 'Departamentos',
      time: 'Hace 32 min',
      status: 'completado',
    },
    {
      user: 'Ana Torres',
      action: 'Asignó rol a usuario',
      module: 'Roles',
      time: 'Hace 1 hora',
      status: 'completado',
    },
    {
      user: 'Luis Vargas',
      action: 'Envió solicitud de revisión',
      module: 'Políticas',
      time: 'Hace 2 horas',
      status: 'pendiente',
    },
    {
      user: 'Rosa Pereira',
      action: 'Rechazó auditoría financiera',
      module: 'Trámites',
      time: 'Hace 3 horas',
      status: 'rechazado',
    },
  ];

  navigate(route: string) {
    this.router.navigate([route]);
  }
}
