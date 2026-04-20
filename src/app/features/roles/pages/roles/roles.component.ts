import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Permission {
  module: string;
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
}

interface Role {
  id: number;
  name: string;
  description: string;
  userCount: number;
  permissions: Permission[];
}

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss',
})
export class RolesComponent {
  showModal = false;
  isEditing = false;
  selectedRole: Role | null = null;

  modules = [
    'Dashboard',
    'Usuarios',
    'Roles',
    'Departamentos',
    'Políticas',
    'Trámites',
    'Notificaciones',
  ];

  roles: Role[] = [
    {
      id: 1,
      name: 'Administrador',
      description:
        'Acceso total al sistema. Configura políticas y diseña flujos de trabajo.',
      userCount: 2,
      permissions: this.modules.map((m) => ({
        module: m,
        canView: true,
        canCreate: true,
        canEdit: true,
        canDelete: true,
      })),
    },
    {
      id: 2,
      name: 'Funcionario',
      description:
        'Ejecuta trámites, interactúa con actividades asignadas y registra información.',
      userCount: 8,
      permissions: this.modules.map((m) => ({
        module: m,
        canView: true,
        canCreate: ['Trámites'].includes(m),
        canEdit: ['Trámites'].includes(m),
        canDelete: false,
      })),
    },
    {
      id: 3,
      name: 'Solicitante',
      description:
        'Inicia trámites, consulta su estado y adjunta documentación requerida.',
      userCount: 44,
      permissions: this.modules.map((m) => ({
        module: m,
        canView: ['Dashboard', 'Trámites'].includes(m),
        canCreate: ['Trámites'].includes(m),
        canEdit: false,
        canDelete: false,
      })),
    },
  ];

  currentRole: Partial<Role> = {};

  openCreate() {
    this.isEditing = false;
    this.currentRole = {
      name: '',
      description: '',
      userCount: 0,
      permissions: this.modules.map((m) => ({
        module: m,
        canView: false,
        canCreate: false,
        canEdit: false,
        canDelete: false,
      })),
    };
    this.showModal = true;
  }

  openEdit(role: Role) {
    this.isEditing = true;
    this.currentRole = {
      ...role,
      permissions: role.permissions.map((p) => ({ ...p })),
    };
    this.showModal = true;
  }

  viewPermissions(role: Role) {
    this.selectedRole = role;
  }

  save() {
    if (!this.currentRole.name) return;

    if (this.isEditing) {
      const idx = this.roles.findIndex((r) => r.id === this.currentRole.id);
      if (idx !== -1) this.roles[idx] = this.currentRole as Role;
    } else {
      this.roles.push({ ...(this.currentRole as Role), id: Date.now() });
    }
    this.showModal = false;
  }

  delete(id: number) {
    if (confirm('¿Eliminar este rol?')) {
      this.roles = this.roles.filter((r) => r.id !== id);
    }
  }

  closeModal() {
    this.showModal = false;
  }
  closeDetail() {
    this.selectedRole = null;
  }
}
