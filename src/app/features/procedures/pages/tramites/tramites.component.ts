import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type TramiteStatus = 'pendiente' | 'en proceso' | 'aprobado' | 'rechazado';

interface Tramite {
  id: number;
  code: string;
  title: string;
  description: string;
  solicitante: string;
  department: string;
  status: TramiteStatus;
  createdAt: string;
  updatedAt: string;
  priority: 'alta' | 'media' | 'baja';
}

@Component({
  selector: 'app-tramites',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tramites.component.html',
  styleUrl: './tramites.component.scss',
})
export class TramitesComponent {
  showModal = false;
  showDetail = false;
  isEditing = false;
  searchTerm = '';
  filterStatus = '';
  selectedTramite: Tramite | null = null;

  departments = [
    'Tecnología',
    'Recursos Humanos',
    'Legal',
    'Administración',
    'Finanzas',
  ];
  priorities: ('alta' | 'media' | 'baja')[] = ['alta', 'media', 'baja'];
  statuses: TramiteStatus[] = [
    'pendiente',
    'en proceso',
    'aprobado',
    'rechazado',
  ];

  tramites: Tramite[] = [
    {
      id: 1,
      code: 'TRM-001',
      title: 'Solicitud de vacaciones',
      description:
        'Solicitud de 15 días de vacaciones anuales correspondientes al período 2025.',
      solicitante: 'Ana Torres',
      department: 'Recursos Humanos',
      status: 'aprobado',
      createdAt: '2025-04-01',
      updatedAt: '2025-04-03',
      priority: 'baja',
    },
    {
      id: 2,
      code: 'TRM-002',
      title: 'Actualización de contrato',
      description:
        'Revisión y actualización de cláusulas contractuales para el nuevo período.',
      solicitante: 'Luis Vargas',
      department: 'Legal',
      status: 'en proceso',
      createdAt: '2025-04-05',
      updatedAt: '2025-04-08',
      priority: 'alta',
    },
    {
      id: 3,
      code: 'TRM-003',
      title: 'Compra de equipos',
      description: 'Adquisición de 5 laptops para el equipo de desarrollo.',
      solicitante: 'Erik Sensano',
      department: 'Tecnología',
      status: 'pendiente',
      createdAt: '2025-04-10',
      updatedAt: '2025-04-10',
      priority: 'media',
    },
    {
      id: 4,
      code: 'TRM-004',
      title: 'Capacitación de personal',
      description:
        'Programa de capacitación en herramientas digitales para el equipo de RRHH.',
      solicitante: 'María López',
      department: 'Recursos Humanos',
      status: 'en proceso',
      createdAt: '2025-04-08',
      updatedAt: '2025-04-11',
      priority: 'media',
    },
    {
      id: 5,
      code: 'TRM-005',
      title: 'Auditoría financiera',
      description: 'Revisión de estados financieros del primer trimestre 2025.',
      solicitante: 'Rosa Pereira',
      department: 'Finanzas',
      status: 'rechazado',
      createdAt: '2025-04-02',
      updatedAt: '2025-04-06',
      priority: 'alta',
    },
    {
      id: 6,
      code: 'TRM-006',
      title: 'Registro de nuevo proveedor',
      description:
        'Alta de proveedor de servicios de limpieza para las instalaciones.',
      solicitante: 'Ana Torres',
      department: 'Administración',
      status: 'pendiente',
      createdAt: '2025-04-12',
      updatedAt: '2025-04-12',
      priority: 'baja',
    },
  ];

  currentTramite: Partial<Tramite> = {};

  get filteredTramites() {
    return this.tramites.filter((t) => {
      const matchSearch =
        !this.searchTerm ||
        t.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        t.code.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        t.solicitante.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchStatus = !this.filterStatus || t.status === this.filterStatus;
      return matchSearch && matchStatus;
    });
  }

  get countByStatus() {
    return {
      pendiente: this.tramites.filter((t) => t.status === 'pendiente').length,
      enProceso: this.tramites.filter((t) => t.status === 'en proceso').length,
      aprobado: this.tramites.filter((t) => t.status === 'aprobado').length,
      rechazado: this.tramites.filter((t) => t.status === 'rechazado').length,
    };
  }

  openCreate() {
    this.isEditing = false;
    this.currentTramite = {
      priority: 'media',
      department: 'Tecnología',
      status: 'pendiente',
      solicitante: 'Ana Torres',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    this.showModal = true;
  }

  openEdit(tramite: Tramite) {
    this.isEditing = true;
    this.currentTramite = { ...tramite };
    this.showModal = true;
    this.showDetail = false;
  }

  openDetail(tramite: Tramite) {
    this.selectedTramite = tramite;
    this.showDetail = true;
  }

  changeStatus(tramite: Tramite, status: TramiteStatus) {
    tramite.status = status;
    tramite.updatedAt = new Date().toISOString().split('T')[0];
    this.selectedTramite = { ...tramite };
  }

  save() {
    if (!this.currentTramite.title || !this.currentTramite.description) return;

    if (this.isEditing) {
      const idx = this.tramites.findIndex(
        (t) => t.id === this.currentTramite.id,
      );
      if (idx !== -1) {
        this.tramites[idx] = {
          ...(this.currentTramite as Tramite),
          updatedAt: new Date().toISOString().split('T')[0],
        };
      }
    } else {
      const newCode =
        'TRM-' + String(this.tramites.length + 1).padStart(3, '0');
      this.tramites.push({
        ...(this.currentTramite as Tramite),
        id: Date.now(),
        code: newCode,
      });
    }
    this.showModal = false;
  }

  delete(id: number) {
    if (confirm('¿Eliminar este trámite?')) {
      this.tramites = this.tramites.filter((t) => t.id !== id);
      this.showDetail = false;
    }
  }

  closeModal() {
    this.showModal = false;
  }
  closeDetail() {
    this.showDetail = false;
    this.selectedTramite = null;
  }
}
