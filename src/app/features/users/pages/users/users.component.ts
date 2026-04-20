import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type UserRole = 'Administrador' | 'Funcionario' | 'Solicitante';
type UserStatus = 'activo' | 'inactivo';

interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  status: UserStatus;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  showModal = false;
  isEditing = false;
  searchTerm = '';

  users: User[] = [
    {
      id: 1,
      name: 'Erik Sensano',
      email: 'erik@empresa.com',
      role: 'Administrador',
      department: 'TI',
      status: 'activo',
    },
    {
      id: 2,
      name: 'María López',
      email: 'maria@empresa.com',
      role: 'Funcionario',
      department: 'RRHH',
      status: 'activo',
    },
    {
      id: 3,
      name: 'Carlos Méndez',
      email: 'carlos@empresa.com',
      role: 'Funcionario',
      department: 'Legal',
      status: 'activo',
    },
    {
      id: 4,
      name: 'Ana Torres',
      email: 'ana@empresa.com',
      role: 'Solicitante',
      department: 'Externo',
      status: 'activo',
    },
    {
      id: 5,
      name: 'Luis Vargas',
      email: 'luis@empresa.com',
      role: 'Solicitante',
      department: 'Externo',
      status: 'inactivo',
    },
    {
      id: 6,
      name: 'Rosa Pereira',
      email: 'rosa@empresa.com',
      role: 'Funcionario',
      department: 'Administración',
      status: 'activo',
    },
  ];

  roles: UserRole[] = ['Administrador', 'Funcionario', 'Solicitante'];
  departments = ['TI', 'RRHH', 'Legal', 'Administración', 'Externo'];

  currentUser: Partial<User> = {};

  get filteredUsers() {
    if (!this.searchTerm) return this.users;
    const term = this.searchTerm.toLowerCase();
    return this.users.filter(
      (u) =>
        u.name.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term) ||
        u.role.toLowerCase().includes(term) ||
        u.department.toLowerCase().includes(term),
    );
  }
  get activeCount() {
    return this.users.filter((u) => u.status === 'activo').length;
  }

  openCreate() {
    this.isEditing = false;
    this.currentUser = {
      role: 'Funcionario',
      department: 'TI',
    };
    this.showModal = true;
  }

  openEdit(user: User) {
    this.isEditing = true;
    this.currentUser = { ...user };
    this.showModal = true;
  }

  save() {
    if (!this.currentUser.name || !this.currentUser.email) return;

    if (this.isEditing) {
      const idx = this.users.findIndex((u) => u.id === this.currentUser.id);
      if (idx !== -1) this.users[idx] = this.currentUser as User;
    } else {
      const newUser: User = {
        ...(this.currentUser as User),
        id: Date.now(),
      };
      this.users.push(newUser);
    }
    this.showModal = false;
  }

  delete(id: number) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.users = this.users.filter((u) => u.id !== id);
    }
  }

  closeModal() {
    this.showModal = false;
  }
}
