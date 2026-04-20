import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type NotifType =
  | 'tramite'
  | 'aprobacion'
  | 'rechazo'
  | 'asignacion'
  | 'sistema';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: NotifType;
  read: boolean;
  time: string;
  user: string;
}

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent {
  filterType = '';

  notifications: Notification[] = [
    {
      id: 1,
      title: 'Nuevo trámite asignado',
      message:
        'Se te asignó el trámite TRM-003 "Compra de equipos" para revisión.',
      type: 'asignacion',
      read: false,
      time: 'Hace 5 min',
      user: 'Erik Sensano',
    },
    {
      id: 2,
      title: 'Trámite aprobado',
      message:
        'Tu trámite TRM-001 "Solicitud de vacaciones" fue aprobado exitosamente.',
      type: 'aprobacion',
      read: false,
      time: 'Hace 20 min',
      user: 'María López',
    },
    {
      id: 3,
      title: 'Trámite rechazado',
      message:
        'El trámite TRM-005 "Auditoría financiera" fue rechazado. Revisá los motivos.',
      type: 'rechazo',
      read: false,
      time: 'Hace 1 hora',
      user: 'Rosa Pereira',
    },
    {
      id: 4,
      title: 'Trámite en proceso',
      message:
        'El trámite TRM-002 "Actualización de contrato" avanzó al siguiente paso.',
      type: 'tramite',
      read: true,
      time: 'Hace 2 horas',
      user: 'Luis Vargas',
    },
    {
      id: 5,
      title: 'Nueva política publicada',
      message:
        'Se publicó una nueva política de negocio: "Proceso de compras 2025".',
      type: 'sistema',
      read: true,
      time: 'Hace 3 horas',
      user: 'Sistema',
    },
    {
      id: 6,
      title: 'Tarea asignada',
      message: 'Tenés una nueva actividad pendiente en el flujo de TRM-004.',
      type: 'asignacion',
      read: true,
      time: 'Ayer',
      user: 'María López',
    },
    {
      id: 7,
      title: 'Trámite completado',
      message:
        'El trámite TRM-001 finalizó exitosamente todos sus pasos del workflow.',
      type: 'aprobacion',
      read: true,
      time: 'Ayer',
      user: 'Sistema',
    },
    {
      id: 8,
      title: 'Actualización del sistema',
      message:
        'El sistema fue actualizado a la versión 1.2.0 con nuevas funcionalidades.',
      type: 'sistema',
      read: true,
      time: 'Hace 2 días',
      user: 'Sistema',
    },
  ];

  get filteredNotifications() {
    if (!this.filterType) return this.notifications;
    return this.notifications.filter((n) => n.type === this.filterType);
  }

  get unreadCount() {
    return this.notifications.filter((n) => !n.read).length;
  }

  markAsRead(notif: Notification) {
    notif.read = true;
  }

  markAllAsRead() {
    this.notifications.forEach((n) => (n.read = true));
  }

  delete(id: number) {
    this.notifications = this.notifications.filter((n) => n.id !== id);
  }

  getIcon(type: NotifType): string {
    const icons: Record<NotifType, string> = {
      tramite: '🔄',
      aprobacion: '✅',
      rechazo: '❌',
      asignacion: '📋',
      sistema: '⚙️',
    };
    return icons[type];
  }
}
