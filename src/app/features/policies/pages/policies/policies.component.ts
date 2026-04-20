import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

type PolicyStatus = 'activa' | 'borrador' | 'inactiva';
type PolicyType = 'secuencial' | 'condicional' | 'paralelo';

interface PolicyStep {
  order: number;
  activity: string;
  department: string;
  responsible: string;
}

interface Policy {
  id: number;
  name: string;
  description: string;
  type: PolicyType;
  status: PolicyStatus;
  department: string;
  steps: PolicyStep[];
  createdAt: string;
  tramiteCount: number;
}

@Component({
  selector: 'app-policies',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './policies.component.html',
  styleUrl: './policies.component.scss',
})
export class PoliciesComponent {
  showModal = false;
  showDetail = false;
  isEditing = false;
  selectedPolicy: Policy | null = null;
  searchTerm = '';

  departments = [
    'Tecnología',
    'Recursos Humanos',
    'Legal',
    'Administración',
    'Finanzas',
  ];
  types: PolicyType[] = ['secuencial', 'condicional', 'paralelo'];
  statuses: PolicyStatus[] = ['activa', 'borrador', 'inactiva'];

  policies: Policy[] = [
    {
      id: 1,
      name: 'Proceso de Compras',
      description:
        'Flujo para gestionar adquisiciones de bienes y servicios dentro de la organización.',
      type: 'secuencial',
      status: 'activa',
      department: 'Administración',
      tramiteCount: 12,
      createdAt: '2025-03-01',
      steps: [
        {
          order: 1,
          activity: 'Solicitud de compra',
          department: 'Administración',
          responsible: 'Rosa Pereira',
        },
        {
          order: 2,
          activity: 'Aprobación presupuestal',
          department: 'Finanzas',
          responsible: 'Luis Vargas',
        },
        {
          order: 3,
          activity: 'Revisión legal',
          department: 'Legal',
          responsible: 'Carlos Méndez',
        },
        {
          order: 4,
          activity: 'Orden de compra',
          department: 'Administración',
          responsible: 'Rosa Pereira',
        },
      ],
    },
    {
      id: 2,
      name: 'Solicitud de Vacaciones',
      description: 'Proceso para gestionar permisos y vacaciones del personal.',
      type: 'secuencial',
      status: 'activa',
      department: 'Recursos Humanos',
      tramiteCount: 8,
      createdAt: '2025-03-10',
      steps: [
        {
          order: 1,
          activity: 'Solicitud del empleado',
          department: 'Recursos Humanos',
          responsible: 'María López',
        },
        {
          order: 2,
          activity: 'Aprobación del jefe',
          department: 'Recursos Humanos',
          responsible: 'María López',
        },
        {
          order: 3,
          activity: 'Registro en sistema',
          department: 'Tecnología',
          responsible: 'Erik Sensano',
        },
      ],
    },
    {
      id: 3,
      name: 'Incorporación de Personal',
      description:
        'Flujo paralelo para onboarding de nuevos empleados en la organización.',
      type: 'paralelo',
      status: 'activa',
      department: 'Recursos Humanos',
      tramiteCount: 5,
      createdAt: '2025-03-15',
      steps: [
        {
          order: 1,
          activity: 'Crear cuenta de usuario',
          department: 'Tecnología',
          responsible: 'Erik Sensano',
        },
        {
          order: 1,
          activity: 'Preparar contrato',
          department: 'Legal',
          responsible: 'Carlos Méndez',
        },
        {
          order: 1,
          activity: 'Configurar espacio físico',
          department: 'Administración',
          responsible: 'Rosa Pereira',
        },
        {
          order: 2,
          activity: 'Inducción general',
          department: 'Recursos Humanos',
          responsible: 'María López',
        },
      ],
    },
    {
      id: 4,
      name: 'Auditoría Financiera',
      description:
        'Proceso condicional para revisión de estados financieros con aprobaciones.',
      type: 'condicional',
      status: 'borrador',
      department: 'Finanzas',
      tramiteCount: 0,
      createdAt: '2025-04-01',
      steps: [
        {
          order: 1,
          activity: 'Recopilación de datos',
          department: 'Finanzas',
          responsible: 'Luis Vargas',
        },
        {
          order: 2,
          activity: 'Revisión interna',
          department: 'Finanzas',
          responsible: 'Luis Vargas',
        },
        {
          order: 3,
          activity: 'Validación legal',
          department: 'Legal',
          responsible: 'Carlos Méndez',
        },
      ],
    },
  ];

  currentPolicy: Partial<Policy> = {};

  constructor(private router: Router) {}

  get filteredPolicies() {
    if (!this.searchTerm) return this.policies;
    const term = this.searchTerm.toLowerCase();
    return this.policies.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.department.toLowerCase().includes(term) ||
        p.type.toLowerCase().includes(term),
    );
  }

  get activeCount() {
    return this.policies.filter((p) => p.status === 'activa').length;
  }
  get draftCount() {
    return this.policies.filter((p) => p.status === 'borrador').length;
  }

  openEditor(policy?: Policy) {
    const id = policy?.id ?? 'new';
    this.router.navigate(['/policies', id, 'editor']);
  }

  openCreate() {
    this.isEditing = false;
    this.currentPolicy = {
      type: 'secuencial',
      status: 'borrador',
      department: 'Administración',
      tramiteCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      steps: [
        {
          order: 1,
          activity: '',
          department: 'Administración',
          responsible: '',
        },
      ],
    };
    this.showModal = true;
  }

  openEdit(policy: Policy) {
    this.isEditing = true;
    this.currentPolicy = {
      ...policy,
      steps: policy.steps.map((s) => ({ ...s })),
    };
    this.showModal = true;
    this.showDetail = false;
  }

  openDetail(policy: Policy) {
    this.selectedPolicy = policy;
    this.showDetail = true;
  }

  addStep() {
    if (!this.currentPolicy.steps) this.currentPolicy.steps = [];
    this.currentPolicy.steps.push({
      order: this.currentPolicy.steps.length + 1,
      activity: '',
      department: 'Administración',
      responsible: '',
    });
  }

  removeStep(index: number) {
    this.currentPolicy.steps?.splice(index, 1);
  }

  save() {
    if (!this.currentPolicy.name) return;
    if (this.isEditing) {
      const idx = this.policies.findIndex(
        (p) => p.id === this.currentPolicy.id,
      );
      if (idx !== -1) this.policies[idx] = this.currentPolicy as Policy;
    } else {
      this.policies.push({ ...(this.currentPolicy as Policy), id: Date.now() });
    }
    this.showModal = false;
  }

  delete(id: number) {
    if (confirm('¿Eliminar esta política?')) {
      this.policies = this.policies.filter((p) => p.id !== id);
      this.showDetail = false;
    }
  }

  closeModal() {
    this.showModal = false;
  }
  closeDetail() {
    this.showDetail = false;
    this.selectedPolicy = null;
  }
}
