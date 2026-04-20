import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Department {
  id: number;
  name: string;
  manager: string;
  employeeCount: number;
  activeProcesses: number;
  description: string;
}

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.scss',
})
export class DepartmentsComponent {
  showModal = false;
  isEditing = false;
  searchTerm = '';

  departments: Department[] = [
    {
      id: 1,
      name: 'Tecnología',
      manager: 'Erik Sensano',
      employeeCount: 8,
      activeProcesses: 12,
      description: 'Gestión de sistemas e infraestructura tecnológica.',
    },
    {
      id: 2,
      name: 'Recursos Humanos',
      manager: 'María López',
      employeeCount: 5,
      activeProcesses: 7,
      description: 'Administración del personal y procesos de selección.',
    },
    {
      id: 3,
      name: 'Legal',
      manager: 'Carlos Méndez',
      employeeCount: 4,
      activeProcesses: 5,
      description: 'Asesoría legal y cumplimiento normativo.',
    },
    {
      id: 4,
      name: 'Administración',
      manager: 'Rosa Pereira',
      employeeCount: 6,
      activeProcesses: 9,
      description: 'Gestión administrativa y control de recursos.',
    },
    {
      id: 5,
      name: 'Finanzas',
      manager: 'Luis Vargas',
      employeeCount: 5,
      activeProcesses: 4,
      description: 'Control financiero y presupuestal de la organización.',
    },
  ];

  currentDepartment: Partial<Department> = {};

  get filteredDepartments() {
    if (!this.searchTerm) return this.departments;
    const term = this.searchTerm.toLowerCase();
    return this.departments.filter(
      (d) =>
        d.name.toLowerCase().includes(term) ||
        d.manager.toLowerCase().includes(term),
    );
  }

  get totalEmployees() {
    return this.departments.reduce((sum, d) => sum + d.employeeCount, 0);
  }

  get totalActiveProcesses() {
    return this.departments.reduce((sum, d) => sum + d.activeProcesses, 0);
  }

  openCreate() {
    this.isEditing = false;
    this.currentDepartment = { employeeCount: 0, activeProcesses: 0 };
    this.showModal = true;
  }

  openEdit(dept: Department) {
    this.isEditing = true;
    this.currentDepartment = { ...dept };
    this.showModal = true;
  }

  save() {
    if (!this.currentDepartment.name || !this.currentDepartment.manager) return;

    if (this.isEditing) {
      const idx = this.departments.findIndex(
        (d) => d.id === this.currentDepartment.id,
      );
      if (idx !== -1)
        this.departments[idx] = this.currentDepartment as Department;
    } else {
      this.departments.push({
        ...(this.currentDepartment as Department),
        id: Date.now(),
        activeProcesses: 0,
      });
    }
    this.showModal = false;
  }

  delete(id: number) {
    if (confirm('¿Eliminar este departamento?')) {
      this.departments = this.departments.filter((d) => d.id !== id);
    }
  }

  closeModal() {
    this.showModal = false;
  }
}
